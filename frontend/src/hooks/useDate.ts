export default function useDate(raw_date:string){
    const date = new Date(raw_date)
    return date.toLocaleDateString('en-US',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
}