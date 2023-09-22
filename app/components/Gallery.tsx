"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { ImageResults } from "@/models/Images";
import fetchImages from "../lib/fetchImages";
import ImageCard from "./ImageCard";
import getPages from "../lib/getPages";
import Footer from "./Footer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default function Gallery({ topic = "curated", page }: Props) {
  const [image, setImage] = useState<ImageResults>();
  const { state } = useAuthContext();
  let url = "";
  if (topic === "curated" && page) {
    // browsing beyond home
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (topic === "curated") {
    // home
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    // 1st page of search results
    url = `https://api.pexels.com/v1/search?query=${topic}`;
  } else {
    // search result beyond 1st page
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`;
  }

  const {
    data: images,
    isLoading,
    error,
  } = useQuery({ queryKey: ["images", url], queryFn: () => fetchImages(url) });

  useEffect(() => {
    if (images) {
      setImage(images);
    }
  }, [images]);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    console.log(result);
    console.log(image);
    const newItems: ImageResults = { ...image! };
    const [removed] = newItems.photos.splice(result.source.index, 1);
    newItems.photos.splice(result.destination.index, 0, removed);
    setImage(newItems);
  }

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-76px)] w-full items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spinner rounded-full border-8 border-t-8 border-t-slate-800 ease-linear"></div>
      </div>
    );

  if (!image || image.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  const { prevPage, nextPage } = getPages(image);

  const footerProps = { topic, page, nextPage, prevPage };

  return (
    <>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        {!state.user.is_authenticated ? (
          <div className="mb-8 py-4 px-2 bg-slate-100 border-2 border-slate-600 border-dotted rounded-xl">
            <Link href="/login" className="underline ">
              Log in
            </Link>{" "}
            to drag and drop images to reorder them.
          </div>
        ) : null}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <div
                className="droppable"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {/* Images will go here */}
                  {image.photos.map((photo, index) => {
                    return (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                        isDragDisabled={
                          state.user.is_authenticated ? false : true
                        }
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <ImageCard photo={photo} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {droppableProvided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Footer {...footerProps} />
      </div>
    </>
  );
}
