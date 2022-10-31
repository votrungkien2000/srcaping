const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://www.booking.com/index.vi.html?aid=336510&label=melbourne-biF21fFWLuf31kP48lLVsAS154363258292%3Apl%3Ata%3Ap1%3Ap2260%2C000%3Aac%3Aap%3Aneg%3Afi%3Atiaud-297601666515%3Akwd-40826943%3Alp9053233%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YXL5GV3cgz10NyjSyBn12N8&sid=a9f5c3e68e5e1879fe8b8ee80f3c5b2c&click_from_logo=1";
const urlGetpage = "https://www.booking.com/searchresults.vi.html?label=gog235jc-1DCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AED6AEB-AECiAIBqAIDuALo0vyaBsACAdICJGNjMGE2MDRhLTkyYjEtNDc4ZS1hYWRlLThkZjQ5MDdmNmIyZNgCBOACAQ&sid=a9f5c3e68e5e1879fe8b8ee80f3c5b2c&aid=397594&dest_id=-3712045&dest_type=city&offset="
const listAdress = []
const listHotel = []
async function getData(url) {
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const hotelDetails = $(".bui-carousel__item");
        hotelDetails.each(function () {
            href = $(this).find(".popular-destinations-carousel-link").attr("href");
            img = $(this).find(".bui-card__image-container img").attr("src")
            title = $(this).find(".bui-card__content .bui-card__title .bui-card__title").text()
            if (href !== undefined) {
                listAdress.push({ href, img, title })
            }
        });
        // console.log(listAdress)
        return listAdress
    } catch (error) {
        console.log(error)
    }
}

async function getDataDetail() {
    try {
        const listAdressHotel = await getData(url)
        for (const list of listAdressHotel) {
            const response = await axios.get(list.href)
            const $ = cheerio.load(response.data)
            const hotelDetails = $(".a826ba81c4")
            hotelDetails.each(function () {
                nameHotel = $(this).find(".e13098a59f .fcab3ed991").text()
                location = $(this).find(".f4bd0794db .cb5ebe3ffb").text()
                scores = $(this).find(".a1b3f50dcd .d10a6220b4").text()
                // console.log(nameHotel)
                listHotel.push({ nameHotel, location, scores })
                getPage(list.href)
            })
        }
        // console.log(listAdress)
        // console.log(listHotel)
        return listHotel;
    } catch (error) {
        console.log(error)
    }
}
async function getPage(urlGetpage) {
    try {
        const response = await axios.get(urlGetpage)
        const $ = cheerio.load(response.data)
        console.log($(".a8b500abde").children("li").last().children("button").text())
        // for (let i; i <= $(".a8b500abde li").length; i++) {
        //     nextPage = urlGetpage + `offset=${25*i}`;
        //     console.log(i)
        //     console.log(nextPage)
        //     getDataDetail(nextPage)
        // }
        // if ($(".f32a99c8d1 button").length > 1) {
        //     nextPage = urlGetpage + `offset=${25*parsenInt($(".f32a99c8d1 button").text())}`;
        //     // console.log(nextPage)
        //     // getDataDetail(nextPage)
        // }
    } catch (error) {
        console.log(error)
    }
}
// getDataDetail()
getPage("https://www.booking.com/searchresults.vi.html?aid=397594&label=gog235jc-1DCAEoggI46AdIKlgDaPQBiAEBmAEquAEXyAEM2AED6AEB-AECiAIBqAIDuALo0vyaBsACAdICJGNjMGE2MDRhLTkyYjEtNDc4ZS1hYWRlLThkZjQ5MDdmNmIyZNgCBOACAQ&sid=a9f5c3e68e5e1879fe8b8ee80f3c5b2c&dest_id=-3728113&dest_type=city&srpvid=d37643706b4600ac&")