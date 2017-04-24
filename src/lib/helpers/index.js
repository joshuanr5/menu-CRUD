export function getInitialFileList(url) {
  const list = [];

  if (url) {
    list.push({
      uid: -url.length,
      name: 'xxx.png',
      status: 'done',
      url,
    });
  }

  return list;
}

export function getUrlFromFileList(fileList = []) {
  return (fileList[0] || {}).url;
}
