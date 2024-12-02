"use client"

import { InnerHTML } from "@/components/InnerHTML";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TabDescriptifProps{
    categorySneaker?: {name: string; description: string, designer: string} | null;
    themes?: {name: string; description: string, category: {name: string; description: string, globalName: string} | null}[];
    tags?: {name: string; description: string}[]
}


export const TabDescriptif = ({categorySneaker, themes = [], tags = []}: TabDescriptifProps) => {
    return (
      <section className="w-full">
        <Tabs defaultValue="categorySneaker" className="w-full">
          <TabsList className="flex gap-x-4 justify-start bg-transparent rounded-none">
              <Button asChild><TabsTrigger value={"categorySneaker"}>Catégorie sneaker</TabsTrigger></Button>
              <Button asChild><TabsTrigger value={"themes"}>Thèmes</TabsTrigger></Button>
              <Button asChild><TabsTrigger value={"tags"}>Tags</TabsTrigger></Button>         
          </TabsList>
          <TabsContent value="categorySneaker">
            <Card>
              <CardHeader>
                <CardTitle>Catégorie de sneaker</CardTitle>
                <CardDescription>{categorySneaker?.name} / {categorySneaker?.designer}</CardDescription>
              </CardHeader>
              <CardContent><InnerHTML className="text-slate-500" text={categorySneaker?.description || ""} /></CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="themes">
            <Card>
              <CardHeader>
                <CardTitle>Thèmes</CardTitle>
                <CardDescription>{"La liste des thème ainsi ces catégories"}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {themes.map((theme, idx) =>(
                    <>
                      <li key={theme.name}><span className="text-base font-bold text-emerald-500 capitalize underline">{theme.name}</span></li>
                      <li key={theme.name} className="flex gap-x-2"><InnerHTML className="text-slate-500" text={theme.description} /></li>
                      {!!theme.category && (
                        <li key={theme.name} className="flex gap-x-2"><span className="font-bold">Catégorie</span>
                          <ul className="space-y-2">
                            <li><span className="capitalize">{theme.category.globalName} / {theme.category.name}</span></li>
                            <li className="flex gap-x-2"><InnerHTML className="text-slate-500" text={theme.category.description} /></li>
                          </ul>
                        </li>
                      )}
                      {idx + 1 !== themes.length && <Separator className="!my-4" />}
                    </>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>{"La liste des tags"}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tags.map((tag, idx) =>(
                    <>
                      <li key={tag.name}><span className="text-base font-bold text-emerald-500 capitalize underline">{tag.name}</span></li>
                      <li key={tag.name} className="flex gap-x-2"><InnerHTML className="text-slate-500" text={tag.description} /></li>
                      {idx + 1 !== tags.length && <Separator className="!my-4"/>}
                    </>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    )
}
