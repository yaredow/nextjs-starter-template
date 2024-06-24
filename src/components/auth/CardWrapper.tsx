"use cclient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Social from "@/components/auth/Social";
import RegisterAndForgetPasswordLinks from "./RegisterAndForgetPasswordLinks";
import BackButton from "./BackButton";

type CardWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
  isLogin?: boolean;
};

export default function CardWrapper({
  children,
  title,
  description,
  showSocial,
  isLogin,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) {
  return (
    <Card className="w-[350px] shadow-md md:w-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        {children}
        {isLogin && <RegisterAndForgetPasswordLinks />}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          backButtonHref={backButtonHref}
          backButtonLabel={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
}
