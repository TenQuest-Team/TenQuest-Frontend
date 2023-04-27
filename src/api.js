const API_END_POINT = 'https://tenquest.run.goorm.site';

export const request = async (url, options = {}, errorMessage='') => {
    try{
      const res = await fetch(`${API_END_POINT}${url}`, {
        ...options
      });
  
      if(res.ok) {
        return await res.json();
      }
  
      throw new Error('API 호출 오류')
    } catch(e) {
      if(errorMessage !== ''){
        alert(errorMessage);
      }
    }
  } 