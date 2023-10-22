import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Cards() {
  return (
    <div className="space-x-5 flex flex-row items-center justify-center h-[600px]">
      <Card className="w-[350px] h-[310px] ml-5 bg-white">
        <CardHeader>
          <CardTitle>Discover Valuable Insights</CardTitle>
          <CardDescription className="pt-4">
          Uncover a world of valuable data, insights, and knowledge contributed by the community. Support data creators and access premium content through crowdfunding. Your journey to discovery begins here.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button>Discover Data</Button>
        </CardFooter>
      </Card>

      <Card className="w-[350px] h-[310px] ml-5 bg-white">
        <CardHeader>
          <CardTitle>Share Your Stories</CardTitle>
          <CardDescription className="pt-4">
            Be a storyteller and share your knowledge, stories, and data with the world while preserving your anonymity through blockchain. Earn from crowdfunding as your stories become a valuable resource.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button>Create Stories</Button>
        </CardFooter>
      </Card>

      <Card className="w-[350px] h-[310px] ml-5 bg-white">
        <CardHeader>
          <CardTitle>Build Your Reputation</CardTitle>
          <CardDescription className="pt-4">
          Build a strong reputation by consistently sharing accurate and valuable data. A higher reputation allows you to price your content higher, gain more rewards. Become a respected contributor!
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-center">
          <Button>Grow Reputation</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
