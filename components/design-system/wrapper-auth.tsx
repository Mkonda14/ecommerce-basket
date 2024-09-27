import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { OAuth } from "./o-auth";
import { SeparatorText } from "./separator-text";

interface WrapperProps{
    title: string;
    subTitle: string;
    question: string;
    labelLink: string;
    link: string;
    children: React.ReactNode;
    oAuth?: boolean;
}

export const WrapperAuth = ({ title, subTitle, question, labelLink, link, children, oAuth }: WrapperProps) => {
    return (
        <section className="flex flex-col justify-between items-center w-full h-full">
            <Card className="w-3/4 flex flex-col flex-grow justify-center items-center shadow-none border-none space-y-3 py-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{subTitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 w-full">
                    {oAuth && <OAuth />}  
                    {oAuth && <SeparatorText>Or with email</SeparatorText>}         
                    {children}
                </CardContent>
                <CardFooter>
                    <p>{question}</p>
                    <Link href={link} className="inline font-semibold">{labelLink}</Link>
                </CardFooter>
            </Card>
            <section className="w-full flex justify-between items-end">
                <p className="text-slate-600">Privacy Policy</p>
                <p className="text-slate-600">Copyright 2024</p>
            </section>
        </section>
    );
};
