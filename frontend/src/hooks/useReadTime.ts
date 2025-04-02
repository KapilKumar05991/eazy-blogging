export default function useReadTime(content:string){
    return content.split(' ').length/200
}