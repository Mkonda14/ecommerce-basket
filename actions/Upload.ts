// app/actions.ts
'use server';

import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export const uploadFiles = async (files: File[], path: string) => {
  const names: string[] = [];
  try {
    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];

      const fileName = uuidv4().toString();
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const filePath = `${path}/${fileName}`;
      await writeFile(filePath, buffer);

      names.push(fileName);
    }
    console.log(names);
  } catch (error) {
    console.error(error);
  }
  return names;
};
