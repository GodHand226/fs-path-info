import fs from "node:fs";
import path from "path";
import { fileTypeFromFile } from "file-type";

export async function getFolderInfo(folderPath) {
  try {
    const stats = await fs.promises.stat(folderPath);

    if (!stats.isDirectory()) {
      throw new Error("Path is not a directory.");
    }

    const folderInfo = {
      name: path.basename(folderPath),
      path: folderPath,
      size: 0,
      creationTime: stats.birthtime,
      modificationTime: stats.mtime,
      files: [],
      subfolders: [],
    };

    const files = fs.readdirSync(folderPath, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(folderPath, file.name);
      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isFile()) {
        const finfo = await getFileInfo(filePath);
        folderInfo.files.push(finfo);
        folderInfo.size += fileStats.size;
      } else if (fileStats.isDirectory()) {
        folderInfo.subfolders.push(await getFolderInfo(filePath));
      }
    }
    return folderInfo;
  } catch (error) {
    console.error("Error getting folder info:", error);
    throw error;
  }
}

export async function getFileInfo(filePath) {
  const stats = await fs.promises.stat(filePath);
  if (!stats.isFile()) return { Error: "Path is not File" };

  const ftype = await fileTypeFromFile(filePath);
  return {
    file_name: path.basename(filePath),
    file_path: filePath,
    file_type: ftype,
    file_size: stats.size,
    is_symbolic: stats.isSymbolicLink(),
    create_time: stats.birthtime,
    last_modified: stats.mtime,
    last_accessed: stats.atime,
  };
}

export async function getPathInfo(path) {
  try {
    const stats = await fs.promises.stat(path);
    var info = {};
    if (stats.isFile()) {
      info = await getFileInfo(path);
    } else if (stats.isDirectory()) {
      info = await getFolderInfo(path);
    }
    return info;
  } catch (error) {
    console.error("Error getting folder info:", error);
    throw error;
  }
}
