const API_END_POINT = 'https://tenquest.run.goorm.site';
/*
export const request = (url) => {
	return fetch(`${API_END_POINT}${url.indexOf('/') === 0 ? url : `/${url}`}`,
        {mode: 'no-cors'}
    )
        .then(res => {
            console.log(res);

            if(res.ok) {
                console.log(res);
                return res.json();
            }
            throw new Error(`${res.status} Error`);
            
        })
        .catch(e => alert(e.message));
}
*/

export const request =  (url) => {
	let response =  fetch(`${API_END_POINT}${url.indexOf('/') === 0 ? url : `/${url}`}`,
        {mode: 'no-cors'}
    )
    alert(`${API_END_POINT}${url.indexOf('/') === 0 ? url : `/${url}`}`)
    //console.log(response);
    return response;
}