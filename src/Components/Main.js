import React from "react";
import Sidebar from "./Sidebar";
import ImageMasonry from "./ImageMasonry";
import MemeForm from "./Form";
import EditModal from "./EditModal";
const photos = [
  { src: "/images/vict-baby.png" },
  { src: "/images/ned.jpeg" },
  { src: "/images/devilgirl.jpg" },
  { src: "/images/trump.jpg" },
  { src: "/images/one-does-not.jpg" },
  { src: "/images/dank.png" },
  { src: "/images/boy.png" },
  { src: "/images/sad.png" },
  { src: "/images/wolf.png" },
  { src: "/images/fry.jpg" },
  { src: "/images/jobs.jpg" },
  { src: "/images/phone.jpg" },
  { src: "/images/oldie.png" },
  { src: "/images/image.png" },
  { src: "/images/doubt.png" },
  { src: "/images/crying.png" },
  { src: "/images/sponge.png" },
  { src: "/images/dog.png" },
  { src: "/images/frust.png" },
  { src: "/images/web.png" },
  { src: "/images/penguin.png" }
];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
};

class Main extends React.Component {
  state = {
    currentImage: 0,
    modalIsOpen: false,
    currentImagebase64: null,
    ...initialState
  };

  openImage = index => {
    const image = photos[index];
    const base_image = new Image();
    base_image.src = image.src;
    const base64 = this.getBase64Image(base_image);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImagebase64: base64,
      ...initialState
    }));
  };

  toggle = () => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  changeText = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      };
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      };
    }
    return stateObj;
  };

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener("mousemove", event =>
      this.handleMouseMove(event, type)
    );
    this.setState({
      ...stateObj
    });
  };

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging) {
        stateObj = this.getStateObj(e, type);
      }
      this.setState({
        ...stateObj
      });
    }
  };

  handleMouseUp = event => {
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  };

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
  };

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  render() {
    const image = photos[this.state.currentImage];
    const base_image = new Image();
    base_image.src = image.src;
    var wrh = base_image.width / base_image.height;
    var newWidth = 600;
    var newHeight = newWidth / wrh;
    const textStyle = {
      fontFamily: "Impact",
      fontSize: "50px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    };

    return (
      <>
        <div className="main-content">
          <Sidebar />
          <ImageMasonry photos={photos} openImage={this.openImage} />
        </div>
        <EditModal modalIsOpen={this.state.modalIsOpen} toggle={this.toggle}>
          <svg
            width={newWidth}
            id="svg_ref"
            height={newHeight}
            ref={el => {
              this.svgRef = el;
            }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <image
              ref={el => {
                this.imageRef = el;
              }}
              href={this.state.currentImagebase64}
              height={newHeight}
              width={newWidth}
            />
            <text
              style={{
                ...textStyle,
                zIndex: this.state.isTopDragging ? 4 : 1
              }}
              x={this.state.topX}
              y={this.state.topY}
              dominantBaseline="middle"
              textAnchor="middle"
              onMouseDown={event => this.handleMouseDown(event, "top")}
              onMouseUp={event => this.handleMouseUp(event)}
            >
              {this.state.toptext}
            </text>
            <text
              style={textStyle}
              dominantBaseline="middle"
              textAnchor="middle"
              x={this.state.bottomX}
              y={this.state.bottomY}
              onMouseDown={event => this.handleMouseDown(event, "bottom")}
              onMouseUp={event => this.handleMouseUp(event)}
            >
              {this.state.bottomtext}
            </text>
          </svg>
          <MemeForm
            changeText={this.changeText}
            download={this.convertSvgToImage}
          />
        </EditModal>
      </>
    );
  }
}

export default Main;
