exports.getTimeStamp=(date,stamp)=>{
    const [year,month,day]=date.split("-");
    console.log(year,month,day)
    const trimmedYear=year.substring(2);
    console.log("Trimmed Year",trimmedYear)

    const isoString=`${trimmedYear}-${month}-${day}${stamp?"T23:59:59IST":"T00:00:00IST"}`
    console.log("Timestamped Date-> ",isoString)

    return isoString
}