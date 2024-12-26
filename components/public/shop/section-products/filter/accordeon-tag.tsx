"use client";

import { ItemAccordeon } from "./item-accordeon";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TagSneaker } from "@prisma/client";
import { getTagSneakers } from "@/actions/product/tag";
import { useFilters } from "@/hooks/stores/use-filter-store";
import { CheckboxTag } from "./checkbox-tag";

export const AccordeonTag = () => {
  const [tags, setTags] = useState<string[]>([]);
  const queryKey = ["tag-sneakers"];

  const { data: dbTags } = useQuery<TagSneaker[]>({
    queryKey: queryKey,
    queryFn: () => getTagSneakers(),
  });

  const updatedTags = useFilters.use.updatedTagSneakers();

  return (
    <ItemAccordeon idx={6} label="Tag sneakers">
      <div className="flex flex-wrap gap-2">
        {dbTags?.map(({ id, name }) => (
          <CheckboxTag
            key={id}
            value={id}
            label={name}
            onChange={setTags}
            values={tags}
            updated={updatedTags}
          />
        ))}
      </div>
    </ItemAccordeon>
  );
};
