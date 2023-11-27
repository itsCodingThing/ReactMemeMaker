// import MemeForm from "@/components/Form";
// import EditModal from "@/components/EditModal";

// const initialState = {
//     toptext: "",
//     bottomtext: "",
//     isTopDragging: false,
//     isBottomDragging: false,
//     topY: "10%",
//     topX: "50%",
//     bottomX: "50%",
//     bottomY: "90%",
// };

export default function App() {
    return <div></div>;
}
// export default function App() {
//     const imageRef = useRef(null);
//     const svgRef = useRef(null);

//     const [state, setState] = useState({
//         currentImage: 0,
//         modalIsOpen: false,
//         currentImagebase64: null,
//         ...initialState,
//     });

//     const getBase64Image = (img) => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         const dataURL = canvas.toDataURL("image/png");
//         return dataURL;
//     };

//     const openImage = (index) => {
//         const image = photos[index];
//         const base_image = new Image();
//         base_image.src = image.src;
//         const base64 = getBase64Image(base_image);
//         setState((prevState) => ({
//             currentImage: index,
//             modalIsOpen: !prevState.modalIsOpen,
//             currentImagebase64: base64,
//             ...initialState,
//         }));
//     };

//     const toggle = () => {
//         setState((prevState) => ({
//             modalIsOpen: !prevState.modalIsOpen,
//         }));
//     };

//     const changeText = (event) => {
//         setState({
//             [event.currentTarget.name]: event.currentTarget.value,
//         });
//     };

//     const getStateObj = (e, type) => {
//         let rect = imageRef.getBoundingClientRect();
//         const xOffset = e.clientX - rect.left;
//         const yOffset = e.clientY - rect.top;
//         let stateObj = {};
//         if (type === "bottom") {
//             stateObj = {
//                 isBottomDragging: true,
//                 bottomX: `${xOffset}px`,
//                 bottomY: `${yOffset}px`,
//             };
//         } else if (type === "top") {
//             stateObj = {
//                 isTopDragging: true,
//                 topX: `${xOffset}px`,
//                 topY: `${yOffset}px`,
//             };
//         }
//         return stateObj;
//     };

//     const handleMouseMove = (e, type) => {
//         if (state.isTopDragging || state.isBottomDragging) {
//             let stateObj = {};
//             if (type === "bottom" && state.isBottomDragging) {
//                 stateObj = getStateObj(e, type);
//             } else if (type === "top" && state.isTopDragging) {
//                 stateObj = getStateObj(e, type);
//             }
//             setState({
//                 ...stateObj,
//             });
//         }
//     };

//     const handleMouseDown = (e, type) => {
//         const stateObj = getStateObj(e, type);
//         document.addEventListener("mousemove", (event) => handleMouseMove(event, type));
//         setState({
//             ...stateObj,
//         });
//     };

//     const handleMouseUp = () => {
//         setState({
//             isTopDragging: false,
//             isBottomDragging: false,
//         });
//     };

//     const convertSvgToImage = () => {
//         const svg = svgRef;
//         let svgData = new XMLSerializer().serializeToString(svg);
//         const canvas = document.createElement("canvas");
//         canvas.setAttribute("id", "canvas");
//         const svgSize = svg.getBoundingClientRect();
//         canvas.width = svgSize.width;
//         canvas.height = svgSize.height;
//         const img = document.createElement("img");
//         img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));
//         img.onload = function () {
//             canvas.getContext("2d").drawImage(img, 0, 0);
//             const canvasdata = canvas.toDataURL("image/png");
//             const a = document.createElement("a");
//             a.download = "meme.png";
//             a.href = canvasdata;
//             document.body.appendChild(a);
//             a.click();
//         };
//     };

//     const image = photos[state.currentImage];
//     const base_image = new Image();
//     base_image.src = image.src;
//     const wrh = base_image.width / base_image.height;
//     const newWidth = 600;
//     const newHeight = newWidth / wrh;
//     const textStyle = {
//         fontFamily: "Impact",
//         fontSize: "50px",
//         textTransform: "uppercase",
//         fill: "#FFF",
//         stroke: "#000",
//         userSelect: "none",
//     };

//     return (
//         <Fragment>
//             <EditModal modalIsOpen={state.modalIsOpen} toggle={toggle}>
//                 <svg
//                     height={newHeight}
//                     width={newWidth}
//                     id="svg_ref"
//                     ref={svgRef}
//                     xmlns="http://www.w3.org/2000/svg"
//                     xmlnsXlink="http://www.w3.org/1999/xlink"
//                 >
//                     <image ref={imageRef} href={state.currentImagebase64} height={newHeight} width={newWidth} />
//                     <text
//                         style={{
//                             ...textStyle,
//                             zIndex: state.isTopDragging ? 4 : 1,
//                         }}
//                         x={state.topX}
//                         y={state.topY}
//                         dominantBaseline="middle"
//                         textAnchor="middle"
//                         onMouseDown={(event) => handleMouseDown(event, "top")}
//                         onMouseUp={(event) => handleMouseUp(event)}
//                     >
//                         {state.toptext}
//                     </text>
//                     <text
//                         style={textStyle}
//                         dominantBaseline="middle"
//                         textAnchor="middle"
//                         x={state.bottomX}
//                         y={state.bottomY}
//                         onMouseDown={(event) => handleMouseDown(event, "bottom")}
//                         onMouseUp={(event) => handleMouseUp(event)}
//                     >
//                         {state.bottomtext}
//                     </text>
//                 </svg>
//                 <MemeForm changeText={changeText} download={convertSvgToImage} />
//             </EditModal>
//         </Fragment>
//     );
// }
