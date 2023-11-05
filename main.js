const { crawlpage } =require("./crawl")
const { printreport } = require("./report")
async function main(){
    if(process.argv.length<3){
        console.log("no website provided")
        process.exit(1)
    }
    if(process.argv.length>3){
        console.log("too many command line arguments")
        process.exit(1)
    }
    
    const baseURL=process.argv[2]
    
    console.log(`starting crawl of ${baseURL}`)
    const pages= await crawlpage(baseURL,baseURL,{})
    printreport(pages)
}
main()