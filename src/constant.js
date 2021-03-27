const REGION = {
  BOZHOU: 'bz',
  GUOYANG: 'gy',
  MENGCHENG: 'mc',
  LIXIN: 'lx'
};

const HOST = {
  [REGION.BOZHOU]: 'http://jyj.bozhou.gov.cn',
  [REGION.GUOYANG]: 'http://www.gy.gov.cn',
  [REGION.MENGCHENG]: 'http://www.mengcheng.gov.cn',
  [REGION.LIXIN]: 'http://www.lixin.gov.cn',
};

const REGION_CONFIG = {
  [REGION.BOZHOU]: {
    url: `${HOST[REGION.BOZHOU]}/News/showList/2208/page_`,
    selector: '.list-news li'
  },
  [REGION.GUOYANG]: {
    url: `${HOST[REGION.GUOYANG]}/News/showList/1252/page_`,
    selector: '.m-ptlist > ul > li',
  },
  [REGION.MENGCHENG]: {
    url: `${HOST[REGION.MENGCHENG]}/News/showList/5320/page_`,
    selector: '.m-ptlist > ul > li',
  },
  [REGION.LIXIN]: {
    url: `${HOST[REGION.LIXIN]}/News/showList/457/page_`,
    selector: '.m-ptlist > ul > li',
  }
};

exports.REGION = REGION;
exports.HOST = HOST;
exports.REGION_CONFIG = REGION_CONFIG;