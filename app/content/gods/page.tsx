import { cookiesClient } from '@/utils/amplify-utils';
import GodsList from './GodsList';

export default async function godsPage(){
    const { data: gods } = await cookiesClient.models.God.list();
    console.log(JSON.stringify(gods))
    return(
    <span className='flex flex-col items-center justify-center my-9'>
        <span className='my-6'>GODS</span>
        <GodsList gods={gods.map(god => ({godName: god.name || "", godTitle: god.title || "", imageUrl: god.imageUrl || ""}))}/>
    </span>
    ) 
    
}