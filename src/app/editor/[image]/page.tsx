"use client";

import MemeForm from "@/components/Form";
import { useQuery } from "@tanstack/react-query";
import { fetchImageURLById } from "@/frontend-apis/apis";

const SIZE = 400;

export default function EditorPage({ params }: { params: { image: string } }) {
    const { data, isFetching } = useQuery({
        queryKey: ["fetch_image_url"],
        queryFn: () => fetchImageURLById(params.image),
    });

    return (
        <div className="grid grid-cols-4">
            <div className="col-span-3">
                {!isFetching ? (
                    <svg height={SIZE} width={SIZE}>
                        <image href={data?.url} height={SIZE} width={SIZE} />
                        <text
                            style={{
                                fontFamily: "Impact",
                                fontSize: "50px",
                                textTransform: "uppercase",
                                fill: "#FFF",
                                stroke: "#000",
                                userSelect: "none",
                                zIndex: 4,
                            }}
                            x="50%"
                            y="90%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                        >
                            TOP TEXT
                        </text>
                    </svg>
                ) : null}
            </div>
            <div className="col-span-1">
                <MemeForm />
            </div>
        </div>
    );
}
