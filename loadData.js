
export async function loadSportsData(req, res, next) {
    try {
        const url = 'https://data.princegeorgescountymd.gov/resource/wb4e-w4nf.json?$query=SELECT%0A%20%20%60incident_case_id%60%2C%0A%20%20%60date%60%2C%0A%20%20%60clearance_code_inc_type%60%2C%0A%20%20%60pgpd_reporting_area%60%2C%0A%20%20%60pgpd_sector%60%2C%0A%20%20%60pgpd_beat%60%2C%0A%20%20%60street_number%60%2C%0A%20%20%60street_address%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60%2C%0A%20%20%60location%60%2C%0A%20%20%60%3A%40computed_region_87xh_ddyp%60%0AORDER%20BY%20%60date%60%20ASC%20NULL%20LAST'
        const data = await fetch(url);
        const json = await data.json();

        const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
        
        console.log("Results in servides", json.length)
        req.Crimedata = reply;
        next();
      } catch (error) {
        console.log('Error:', error);
      }
}
