import request from '@/utils/request';

export function addImages(imageList) {
  return request({
    url: '/image/addImages',
    method: 'post',
  });
}

export function getImagesBynodeId(treeId) {
  return request({
    url: 'system/picture/list',
    method: 'get',
    params: {
      treeId
    }
  });
}

export function deleteImageByIdAndUrl(pictureId,pictureUrl) {
  return request({
    url: '/system/picture/remove',
    method: 'get',
    params: {
      pictureId,
      pictureUrl
    }
  });
}
