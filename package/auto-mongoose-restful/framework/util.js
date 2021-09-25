//从url中解析出search
const getSearchParams = (url)=>{
    const _search = (url||'').split('?').splice(1).join('?');
    const searchReg = /([a-zA-Z_][0-9a-zA-Z_]+\=[^&]+)/g;
    const searchArr = _search.match(searchReg) || [];
    const searchObj ={};
    searchArr.forEach((itm)=>{
        const itmArr = itm.split('=')
        searchObj[itmArr[0]] = itmArr[1];
    })
    return searchObj

}
module.exports = {getSearchParams}