import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import React from "react";

function LoadingProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-10" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export default LoadingProjectCard;
