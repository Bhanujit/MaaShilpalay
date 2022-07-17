class ApiFeatures{
    //query = mongo find method, queryStr  = keyword
    constructor(query,queryStr){
        this.query = query;
        this.queryStr=queryStr;
    }

    //Backend Search feature Need to note down
    search(){
        const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({ ...keyword });
      return this;
        // const keyword = this.queryStr.keyword;
    
        // if(keyword === null||undefined){
        //      this.query = this.query.find({...{}})
        //      return this
        // }
        // const byName = { 
        //           name:{$regex:this.queryStr.keyword,
        //                 $options:"i"}
        //     }
        // const byCategory = {
        //     category:{$regex:this.queryStr.keyword,
        //               $options:"i"}
        // }         
        
        // const res= this.query.find({...byName}) ||  this.query.find({...byCategory})
           
        //   this.query = res
        //   return this
    }
    
   
    
    //filter 
    filter(){
        const queryCopy = {...this.queryStr}
        // Removing Fields
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
    }
    
    pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports= ApiFeatures    


 // const keyword = this.queryStr.keyword;
    
    // if(keyword=== null||undefined){
    //      this.query = this.query.find({...{}})
    //      return this
    // }

    //   const option1 = { 
    //           name:{$regex:this.queryStr.keyword,
    //                 $options:"i"}
    //     }
    //   const option2 = {
    //     category:{$regex:this.queryStr.keyword,
    //               $options:"i"}
    //     }

    // //   const resByName = this.query.find({...option1})
    // //   const resByCategory= this.query.find({...option2})
    //   this.query = this.query.find({...option2})
    //   return this