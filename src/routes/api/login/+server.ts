import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
export async function POST({ request } : { request:Request }) {
    const body = await request.json();
    if(body.password==env.PASSWORD){
        return json( "success");
    }
    return json( "fail");
}