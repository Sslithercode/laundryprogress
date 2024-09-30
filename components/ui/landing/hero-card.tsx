"use client";
 
import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem} from "../3d-card";
 
export function HeroCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white font-mono"
        >
        Compensation is Simple as can be!
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-mono"
        >
         Prompt: sketch of a house
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="https://ik.imagekit.io/fgtyacioa/image.png?updatedAt=1726255001869"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            className=" text-black text-md font-bold font-mono tracking-tight"
          >
            Artists: Mark Bradford-10% ImgCompany-20% ...
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}