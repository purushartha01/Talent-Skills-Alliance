const logStatements=(string,err=null)=>{
    if(err!==null)
        console.log(`Error ocurred: `,err);

    console.log(string);
}


export {
    logStatements,
}