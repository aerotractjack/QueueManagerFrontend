
export const fetchWrapper = {
  get, 
  post,
  _delete,
};

function get(url: string) {
  const reqOptions = {
    method: "GET",
    mode: "cors",
  } as any;
  return fetch(url, reqOptions).then(handleRes);
}

function post(url: string, jsonData: any) {
  const reqOptions = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(jsonData), 
  } as any;
  return fetch(url, reqOptions).then(handleRes);
}

function _delete(url: string) {
  const reqOptions = {
    method: "DELETE",
    mode: "cors",
  } as any;
  return fetch(url, reqOptions).then(handleRes);
}

async function handleRes(res: Response) {
  let ok = false;
  if (res.ok) {    
    ok = true;
  } else {
    console.log("bad res status code");
  }
  const data = await res.json();
  return {data, ok};
}
