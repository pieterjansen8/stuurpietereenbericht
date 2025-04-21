<script lang="ts" >
    import {Card,  Button, Textarea} from "flowbite-svelte";
    import { Toaster, toast } from 'svelte-sonner'
    let bericht = $state("")
    async function  send() {
        const f = await fetch("https://pieterapi-default-rtdb.europe-west1.firebasedatabase.app/.json", {
            headers:{
            'Accept': 'application/json',
            'Content-Type': "application/json",
        },
            method: "PATCH", 
            body: JSON.stringify({ bericht: bericht})
        })
        if(f.ok) {
            toast.success("Bericht is verstuurd!")
            bericht=""
        } else {
            alert("er ging iets mis")
        }
    }
</script>
<div class="w-screen h-screen flex flex-col py-5  items-center">
    <span class="text-2xl text-white mt-3 ">Geef pieter een seintje!</span>
    <div class="w-screen h-screen flex flex-col py-5  items-center justify-center">
        <Card class="bg-gray-800 max-w-full sm:max-w-96"> 
            <Textarea bind:value={bericht} class="dark:border-green-600 dark:focus:ring-green-700 focus:dark:border-green-500 h-40" placeholder="het bericht"></Textarea>
            <Button onclick={send} color="green" class="mt-4"> verstuur </Button>
        </Card>
    </div>
    
</div>
<Toaster theme="dark" richColors></Toaster>