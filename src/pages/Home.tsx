import React, { useState, useEffect } from "react";
import { useMovieListStore } from "../store/movieStore";
import CarouselSection from "../components/CarouselSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const tabs = ["Movies", "TV Shows", "Documentaries"];
const navigate = useNavigate();

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Movies");
  const {
    trending,
    topRated,
    newReleases,
    recommended,
    action,
    comedy,
    sciFi,
    setMovies,
  } = useMovieListStore();

  const heroSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
  };

  const heroSlides = trending?.slice(0, 5) || [];

  const generateMock = (
    count: number,
    titlePrefix: string,
    imgUrl: string,
    year: string
  ) =>
    Array.from({ length: count }, (_, i) => ({
      _id: `${titlePrefix}-${i + 1}`,
      title: `${titlePrefix} ${i + 1}`,
      posterUrl: imgUrl,
      yearOrTime: year,
    }));

  useEffect(() => {
    const movieData = {
      trending: generateMock(
        15,
        "Inception",
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
        "2010"
      ),
      topRated: generateMock(
        15,
        "The Godfather",
        "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        "1972"
      ),
      newReleases: generateMock(
        15,
        "The Batman",
        "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        "2022"
      ),
      recommended: generateMock(
        15,
        "Fight Club",
        "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
        "1999"
      ),
      action: generateMock(
        15,
        "Mad Max: Fury Road",
        "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
        "2015"
      ),
      comedy: generateMock(
        15,
        "The Mask",
        "https://m.media-amazon.com/images/M/MV5BNGNmNjI0ZmMtMzI5MC00ZjUyLWFlZDEtYjUyMGZlN2E3N2E2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "1994"
      ),
      sciFi: generateMock(
        15,
        "Avatar",
        "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        "2009"
      ),
    };

    const tvData = {
      trending: generateMock(
        15,
        "Breaking Bad",
        "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "2008–2013"
      ),
      topRated: generateMock(
        15,
        "Game of Thrones",
        "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
        "2011–2019"
      ),
      newReleases: generateMock(
        15,
        "The Last of Us",
        "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        "2023"
      ),
      recommended: generateMock(
        15,
        "Stranger Things",
        "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
        "2016–"
      ),
      action: generateMock(
        15,
        "The Boys",
        "https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1ngjM.jpg",
        "2019–"
      ),
      comedy: generateMock(
        15,
        "Brooklyn Nine-Nine",
        "https://image.tmdb.org/t/p/w500/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
        "2013–2021"
      ),
      sciFi: generateMock(
        15,
        "Westworld",
        "https://image.tmdb.org/t/p/w500/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg",
        "2016–2022"
      ),
    };

    const docData = {
      trending: generateMock(
        15,
        "Planet Earth",
        "https://upload.wikimedia.org/wikipedia/en/4/4c/Planet-earth-roddenberry-saxon-muldaur.jpg",
        "2006"
      ),
      topRated: generateMock(
        15,
        "Our Planet",
        "https://m.media-amazon.com/images/I/815SLbX2KlL.jpg",
        "2019"
      ),
      newReleases: generateMock(
        15,
        "Beckham",
        "https://m.media-amazon.com/images/M/MV5BZmNmZTU5ZTUtZTc0NS00ZWJlLWFlMzUtMDRmZDgzMDhjNmM0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "2023"
      ),
      recommended: generateMock(
        15,
        "The Social Dilemma",
        "https://image.tmdb.org/t/p/w500/7rhzEufovmmUqVjcbzMHTBQ2SCG.jpg",
        "2020"
      ),
      action: generateMock(
        15,
        "Free Solo",
        "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/90a866f9-63bb-4628-878d-cb3c919e4148/compose?aspectRatio=1.78&format=webp&width=1200",
        "2018"
      ),
      comedy: generateMock(
        15,
        "Inside Job",
        "https://resizing.flixster.com/ctvMzyhWb5v7Wu-LeCcRb3Hi834=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNDhjNDUwNGMtMTMwZC00NjRmLThlNjQtMDEzNmJmNGU1YzIxLmpwZw==",
        "2021"
      ),
      sciFi: generateMock(
        15,
        "Cosmos: A Spacetime Odyssey",
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFRUXFxcXFhcVFxcWGRcYFxgYGBgXFRUaHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICUvLS0tLS8tLS0tLS0uLjAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKIBOAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYHAQj/xAA/EAABAwIDBAcECAYCAwEAAAABAAIRAwQSITEFBkFREyIyYXGBsZGhwfAHFCMkQmJy4TM0UnPC0UPxFYLSU//EABsBAAIDAQEBAAAAAAAAAAAAAAADAQIEBQYH/8QAMhEAAgIBAgMHAwMDBQAAAAAAAAECAxEEIRIxcRMiMkFRYbEFM8EjkaE0UoEUJNHh8P/aAAwDAQACEQMRAD8A4ahCEACEIQAKdsYfaeRUFWe7/wDFjm08u5WjzRDLpwyg5cfGdJHLIpMgFPVW8v38PemsOesZTr3TH7LSigkiM+Xr8lNwJ17vCeKXMD1n2afPFIc/n8+SkBsjgR3zqRrp7fcqW87bvH4K8J8+7T3qjvT13ePwSbORZDAK9C8XsJJY8CAvUAIA1f0Yj78P7b/guw025rj/ANGP88P7b/guxsC52q+4bKPASKTVLY1R7cKY1qrEszxJcllqS8KxU1exj9izwVgFXbF/hM8FYhdCPhRjfNnqCheSpAFQb7j7qf1M9VoFRb5fyx/Uz1WbWf08+j+Bun+7HqjnrGjvUhrAlsphPNpheLcjvNjGAJD6YU3owkPphVUiOIrKtELi++LYva4/N/iF3KrSC4hvqPv1f9X+IXb+ivNsun5Rj17zWupRoQhekOSCEIQAIQhAAhCet7Yv0gDmTA/fyQSk3yGUK7tN3HVOzWoz3moPfgUba+wq9tBq0yGnJr2kOY7uD25TxjXuUKSexaVU4rLWxWqfsR0VPIqArHYLJqx+Uq8eaFvkX4fz9J+dPcvHic/nw+eSfNEBoABnOTrlPLgdUnoVpKkR7fn55pEcvmdfVTuhSHUVGQIZpn59VSXjftHePwC0xpa+OipNo0z0hnyS7XsWgsleGJYpqfRotGuaHOHJZuLJo7HHNkJ9Apt9KFZ07gARhHv969eGO/L71HE15FlSnyZZfRxXFO9DnadG/l3c11mjtZh0XI91tnPNwADEsdBHlktZcbJeM5M8DmfVZL8SlzHVQcVhm5t9qN5jwkK2o1wVyF9d4MEnLQiZHiZlWGzNu1aeWKR3pai0WcEzqsrxyyNhvaDAeI7/ANleUds03aFTxIW4NG52QPsmeCsFX7FcDRYebVNLl0Y+FGF82LlInNezxSQrEDqo97xNuf1N9Vdqk3v/AJc/qb6rLrf6efR/A+j7keqMbTpJ9tNN0gpLV4WTO02I6NIfTTxTb1CZCIdVi4XvuPv1f9f+IXday4Vvv/PV/wBf+IXe+ifdl0/KM2u+2upRoQhemOUCEIQAIQhACmNkgczCW6pnloNPBIpugg8iD7FIubUtPMHMHmDoVDLx5bE/ZV7hK1+xNpBjsBDX0akipTeMTXDhIPEGCDwXPaUgq0o35EdyVOKZsoucdmTdu7Ns8ZNJ76X5COkaP0ukOA7jPilbrbPYXl7XyQ0gtcImfxNIJ4xl3qp2hJdijJ2Y+KtN0KpbXAgmWuGXkrVt5W5F0a3nEcfuaB1GeGfzqkMZOStHWJLgTrymctcvnioz7SHEQeQjX2LbkwuBHbbpT7QADLn8wrWlbYjodMifgpDrTOO4ajXLXPj4KyKtGYqUI4fD4qpr2vWdlOa2NxbZaZ8+en7qhuWQ90CM/gs2qzwrBt0EU5vPoUlagQJOXcotQjx4+2FqmWmOJBMp643aa4QGwY1WDtuDaSOhZplLwsyDS3knXUwc2+YVjf7EewGMwNQq1tMhOi1NZizM63B4aNHuEYuon8D5B8l0R7Q7Irmu6EMuQZEYXeg4rZ1ttUmdp4HdI9JWO5d/Yth+Y3tHYrTmCQe/NZ682c9uo8xPvC0J280xDHuEgDqGCTGUnjmMlHZtLpGgihUMicgDAzHcdWuHkojxojK8zMEublMhTLO9c3QnnGceXJP31zTGT2PYcz1mkCPHzUWm1pzaQRzBTOa3QL2O8boXk2VBx16MepVxTrTksfupW+50BwDB8Vp7A5SV04x7qOHO39Rr3ZZPfAhNtqKLUf8AmASRl+IGdOCnhZHbxzzLHpFSb4u+7H9TfVSxXhVu878VAj8zfVZdasaefR/Bq01idseqMpQJ5qSCeaZpUVIbSXg5NHoGBJTT5TpYUxVahAiPWJ5rh++p+/V/1f4hdqrNXFN8v52v+r/ELu/RV+rLp+UZdf8AbXUpUIQvSnJBCEIAEIQgAVhs/aIaMFRuNnCDDmTrhPLuPu1VehBMZOLyjUU/qBaXdO9ruDHUiDP6m4gAklloYLa7i7+gU3uJPc4geizKl7Ku+iqsqEYgDmOYIIMd8FLlD0NMNRuk0uu//JqK2zcdv0tPEXMdUa+m7RrWuIloyOuZnmo25RLrqD/Q/LQcOStLXeCi5lRtHEx78TgC0l2N0EumS2MsUZZzlmnd1aA+s9MMA7TXMb+AmCJB0nOPDyStO5KWJLzN2qjXKKdcs7b9fP8AjfHuX1oHMeQIJg4pjLiC2ToJHjCk07NsFwIOcSefIHTlkn7ukypMAd+vJN0KLmthhGskPOXKYC6TOesEcOcwhvEOgHMyNYKu222IYg2fD/a8/wDFl1PtgvGYJAblHLisvvXtV9BlJrSQ7pBUEEhpw8HAEHD1gIlUKSWNy9r02jQfOufuVE7ZbqtZ4bpOZOSvNm7TbcUmVHDAXAZHQGSCB3SJB5Qp1INa0gDUmTkOKzaqxxiseo/Td1t+xBt206ADWs6R0c+qPiU8+5dAdgaPABLqMp0WlzyBOg4nuHJVdbbGN2GABlA+eKxxoTWX+5eeoedi4p29KsCHsDSeIyWM3h3Y6Ikszb8+5aqwr+5aF9kK1J2XCYISrapUfqR5DqdSrO5I4fb0sNTMkCDMGCRxAKmVNt02GKNIOnWQcU88Sk712JYXADjr66rW/RtuRTfhqVMyRJnhK0rE0mxN74JYRzm725cnqFxABBERLSM2idMh3J2zZew17DVDXYi2CQ09kvLQNZxNz/daPau7Z+s3dADrsqOf4sIlpE65EaKnsNtbSollCmMqYLGtNNpycQczEnsj3pq4eRlcmP2m1L5lUU6lN1R7shTeAJjMgHnBE+AVg2lb3BOH7CtoYEDFOjh86harZFW4uattSuGUi5tQPDmsLXNwSXntQJkDTOR3LRb67oUqrTUY0MqgdsCMXc+NVRxTWYl4WYeGK2BRfTs6OLMhkfqOffkolttAUAWhzpJkjEXAHk1V9DaLxbUab8nNYGlU93VcSunX4Eea1Es2y6v5NFV27nm7L2knkAqJ22K7q4mucGXVAHrzTDKBIkGQVGrS0GWZ8P2TUKUjeWm8zA/DUJbkBiPZcTzHAq22xWmnnzC47VrhzGtp1Hh+rgJc6f6WUw3PKePLy39ga1Oxpis4uqSJxCCATIa6CcwMli+pRT01mP7X8HS+n5V0F7om03BPhwVbRu54KQK/cvncos9g4ko1AmKtQJLnlQ7ioURiSoiLiqFxPfI/fa/6v8QuuXFcrkW87C+8rACSXfAL0H0aOLX0/KM31BYrXX8FMhXtjsQHtSe4ZBXttsJn/wCY8wCvVw0s5HDdiRhULfV91qbh/DIPNuXu0Wb2tu5VpAuALmjXLMeI5d6LNJZBZxkI2xZSoQhZhgIQhAAhbHd7dm2rU6TqtYtc8EuAe1uEmsynSEOb+Jra3HUtOggsWOxrY27KtXpBiovdia7Wp05pNa0FkZNDTGLjJIykArN16oFcA/iBaPHUe2I81p92bA2+Nx7TnOj+20w0j9Rk+QWf3n2dTtqjRRxwDlUc9rscBjsTQ0AiHOc2dCWHiHAaO02iH0m1DA6uZ5H8QH/tOXIjzVJNWRa82sm7TSrdc1PmlJr/ACsGip3p/wB/Pmn9msq1qraNJhe9wmG8hkXE6ADmY1HcsgNtCYiG8/iRy9F076P7nodmX96wDpG42tORgMpte0+GKoSecBb29jCpE5m414Bix0SdS0Pf/wDMT7lzn6Sqb2spio1zX03ua4OiRibMyNR1RnoZCTQ2rVFTpulqdIDOMuOKdc3eoVLvBvBUunOxnEC6S52bnEcfyjkB+yhxxzJc8rBt30qDQ1rHFmQwiZy5E8lcvc1lJjiRk2SRxPBcntdt1mRLi9vJxJ9h1Hot/TuektWPBOFzZzAnzjLms10FLCfqNVmzwU+0L01KhqOPcBw9i1+7O5Ny8NquZTbTJxNL3OY8gjIgBhy7jCz+7Fo2rd2lJ8FjqvWaRIIaC6DIznCB5qq+nneCvU2jUtC9wo0BTDWAkNc59NtQvcOJ68Z6Ad5VnhLAlPfJ0na+x6tu0F7BGhLTiaTlAxkAtPiOGSc3ev5puGWRj/tZv6Btp1bu2vLG4calJjWYMZLiwVA8FoJ4dVpA4EFM7HvyABIjFJjifkqHGMqnBkZkpqSG98bKHB4bizzB+Cc3b2+KHVBwD+l/wdwVjtmviMAKjdbsfkRmuTW3DY6s8TW5f7Zm8fTqWxw3Q6rXNhweNcFTPTUzwSKu4G024awNtjGZa173Qc+yTTE66T4SoG61ZlpdU67iS0Yw4T2Q4RIHMZe9bGrsUXFStc2V6X9IJfTxmc84mZaMoDXDzC0RnxL1ZmnWov2IG71AUC6o6alYiHOzgCeywGSBOffl3Kxu7qtU0wgHn/pZ+3v4yzBGRBnUETrpmNFMZUqP4GO/L3g5Kna5WC3ZY3M7taqRVcwkSCAfIDRR7GzfXqsosw4nmAXEgaE5kA8uSh7aqltzVk/izPkFZ7mXQdfWwB/5P8Su1XtWn7fg8pdDN7XrL8k3aGxK9pUZSqYSXiWlhJbkYIkgZjLhxCuNmbrvuWlzS2AYJcSJMSYgHmFp95qX1qnWp0xNa2e0gcXBzGuy7iHEeLFZbHwUcFoCC9tLpHxzLonzOL2BQ7Xw+4+Oih2rz4fLryx/DMDZ21NmbWjFoXRn7U5tF004y1ChWtYnUc/VKvbgU6eKJzHqla9P/TWY/tfwT9Of+5rS9V8j9lbucQA0Eq+ttiF2R15NHxKY3ZrNdS6QNguJHkMvWVqLKpFJ7xrn7gP9r59RXG61wk8JJt454XM9ffbKPIpLndOpEsc0n+kz6rI39q9rix7cLhqFt/rBnECZ5qt+kdg6KlX0dOF3eHCR7D6p1KovrlKlOLjjm85T29FuFNs1NRlvkwF02OawF8wfWap5u+AW1uLsHisPfPmvUP5vgF3/AKImrW36flB9VX6S6/hlxZOC2+6u7Ve7aalMNbTBjG8kAkahoAJMexc+tn5LqG6O2bW42eNnV6/1Z7XEteSGteC8vEk5augtJExI7vZ9rKMMx+M4Xrg824pvcc2hsKpbECrhz7LmmQY1iYzVXeUWx/0rTb+yK9t0fS1empRhpvkwMpDcJJw5Z5EyAqmu8QtNVjlFPKYqUcM5bvjscUX9JTEMccx/S7u7ihajeagH0nt7iR4jMeiFyNZRw2Zitma6pZjuc0Vpu1ZUqtdrKzwynBxOLsMSIbBj+ot8pVWhYhpu6ewbCWBzwDFCW9M04ukdBOuUBriROUjQEJB2NYBjXFwDi1we01RLHDCZABOUPiCTmx2qrtkWNk6ze+q9or/a4B0kEltJ7mgt5FwEHiYHFT9m7P2c9gNV1NhFOm4xVIJcMDqgguPWIxtgaTpkgCRU3esWwMWJ4mWiqwz9g9wHaE9doGRGozzWU2PeFhfTceo4GRrDhoQpW9VjSpvBt8BpBrBia8PJe5smeu7iHcG6RHE1Nn2vJSuYZwW7nABan6L9/GWL6tvdNL7S4yeAMWAxhLsP4mlphwGeQjkceOt5JxluPn4Jr3KnVauxN3f4ztpudQ7XQCp1iNcBAb0scI7XMrnO8l3a1bqpUsqJo27j1GEznxcG/gB/pkx7hX1LaT8U4KYHBGHnICDouobFsnfUaDolrqQPhquXPdGS6nuRtgOtKdu8xhbAJ49yyau11qMvfc06avtG17FMLp1u9r29tj2vpnk5pkTzHAjkVqtvWuyNtYK9eu6zumsDXyQ0OAkxLhheBJggh0ajQCr2hs9pdAIg8Sodzs/o4IhwGmE+oVoWRkslJ1SizT2txY7MtKlrs1zq1Wt/Ern2TjAAJAJwhuQkk561ewtnkuAj9vFU1FrnHqtiTx1WlZedBTmM9J5Jd1/CsRW7GVUcTywcw/WcDhEB0d+SkVdnNdwUHZ20elum5fgdnzWkaAsUotvc1T7rK7ZGyKDKzXVmCpTGrTOR4GPxRyK0uxtkWNpWdc0qr3EtLWsmYBIJAyn8IiVBY0J0M5/Pir17eQqbb8yOLRhe+phAL3OefFziT6p6OSebTJyAJ45CUyQTk0EnXISfcjGCM5OU72XsXdZvAOz7+qFK3IvWNvrd7jhY18kkHIYTyVVvRTLr2vAJOKcgSYDASYHAAEnuCk7rWrnuOFpcdAGgknnEcgu1U8wS9jz2oXDNyXr+TpFxvKaW0K9eiBVpvDBmS1rgGME6TIcDw581J3Z3gaLqvcXL2sxtAGpAzENGXABZWg3PCAS48GguPsAlJZic7C1jnkahocTyzAGSY4xxgyxusUuL3bx5ZZJpXTeEnyUfb95FAnMdZvqlEESANJkco1lVW973/VCWtLpexowgmXF2QHM9ypqI8Vcl6pjdBLg1Nbfk18l9ubvIMHQuOYJLctQdffPtWw2fvRRpksquAa/KDrMZ5ccuGuS+a7fp3VcNJlXpZMMph+ORJMNbnIgz4FN7QuKtRxNTFi0M5GRkZHA5Ly0fpDheroSx/j+OjPYWX1WZyn/7zPptu8Gy5n67SME/Z4wX5ags7XuXHvpY3rub+4FGk11K3p5MbibicTrUfhOUiIbOkcSue07Go5rqjab3MZGN4a4tbOmJwENnvT1qysWufTpvLaY67mtcWtB06QjIDLjGi6NWkroyqopZ57ef7/wZVKL3m3+//Q2RWadXTPM696kUqjpOPtcZ5puhWquMhheJA6oJ60EjzhpP/qUmg2pUc9zKb3BoxvLWlwY0aucQOqO8rZXlSy0Ku4XHut8+Rc0Ky6Fus7ZNxaChcP8AqlyxxJrE/wAQcOu6WxEDAYgiQuZWDXvkMY95ALiGNc4ho1cQBkBz0U6xpuqGKbHvIEkMaXkAakhoMDMZrowsyueDE4nVt6d4rUW1CxtKhrNpEF1Q6dUEAAwA4kumRkIjwzT7zJZu1qk9kE5gZAnN3ZGXE8BxXrr8c1qrsjCOELcW2S9pXPVPgUKg23eQwjicvb+yFmv1Pe2GQhsZhCELnjjQbr29s8O+sYBFSlm95b1C+HhrQ5pMjjnEfhkOVjcWVgWY6RpkkGWPquaWNLX1MQzzqDHRphoxA4HTniImC02WG1MLqTngVOhDnvaCWNpMaHkuA6z2veDIEPdpAiu2da2JrAvLOhFxcAy8g9FDOgMSHEdvP28EAUe8FKm25qtpYejDjgwOxNw8CHY3zl+Y+WgjWfa8lZbZbSdSovpCm3q1DUAIDp6ZwaCzGSOpgMRzzOarLTteRUrmBZ02ToE63LIptjjESM/n2oojMk8NE0qSC/VM1KnJJe/v1zTTnIyA9RZnoVdbHrkRnEKjpXEZRkl06hA9qTfHijg16SfDNs6Zs7abMIDxOeo175HFWf1Gi9uJtaByLZI965Za7Tc3VTqG8RadJHKYXMlRYn3TpOVUlnJ0F1WhQId1nHgYyPkqPbG13VjpDRMCVn2bw4jD+PuSvrgBDmO0gg96bXHh3nzJjXF+F7Gg3WrfeRH9LvRbxlRcz3Tqn6yJ/pf8F0CnVVLH3hOoXeLmwMvb4yfAZn0T14/rkyM4dz7QDviqhtdemr/0hS2wZXHct9nvJcQPy6ajrCHRxAMTPBRbKuG43Gcmg5a5VKagPqc1DuqyhyJUSh2Vbl2069QwAOLsmxUdSpPE8zTqVAE5u9aFgqUmAl4pOENBLi4VKcwBmdD5BV20nddxGZn4BR6dYxou3Su4uiPL6m1uxr0bNRagm5qBwxuIuQejyLz0dScGRiTpkddExsd/24GnbyOo6rsjkM1SmqYHBFJ5z+ITcGZTxv75LbZzRFX+y/1apVuwG0cT/wAVZlyM9XUIcB5yVRdLCpd83n6s7Pi31VbF3WO0tmLY9SJs9uLad03C+pI2gMFMw932dbJhwuhx/SfBZirk4iCIJydqM9HZDPyCr+lK96UrBwnplakbfYLXm0xAOwN/8l0hAOFuOypNp4yMhidIbOp0zS9ymE29ZwBLWVMVQwYaz6letJedA3MDPnCwhqFeYypwVdiZp91r7o6N5ImLfG2MiKhcLZrvJt5VPsUzcCnUc2uGZAPpOxtEmk9tK6w1HtILTRg1GPmI6RhByg4zEV5KlIXJpmz+jhlRzqjWaYrc4myX03NqzTrYYh1JjoxgwMJ1BhR903Y2XTRTqVPuzTgomH5XNvmDgdkNT1dAdNVk0KyeCpt90dqFhuOP3arUb3VaUVKb/Ig+1ULroNHKFUYzzXhKv2jIwO3NcvMnyQmUJbeSQQhCABCEIAE/ZjrJhSLHteSlcwJ5SZS4SDkmEHusDTh/2nhQy+OijynC6eMqSA6IkSElteMjwT9JjvBVl06Hu45qliyhlc3F5RObUaRnrwSC3vVfjShVMJXDgb2ueZb/AFbQRB45zOZz7homyC3iq01yh9wSq8MhnbQ8kbTcWviu2j8j/QLpbQuT/Rs6b0Sf+Op8F1pmSy3R7xZWOayxbT3fPyEOeO5Nlyj1KpSnsSPVaqg13p1xUWo5VZZFFePGN3iPRNhwKbvf4rz3/AJDXAZrv1PuLojx+o+7Pq/kfeTzXoef3Uc1OK8bUHNXyJJfSeCqN7ifqztYxN9VONTNVW9Odu497efNRN91jaF+rHqjEIQhYz0IIQhAAhCEACEIQAIQhAAhCEACEIQAIQhAApFl2vJR0/Z9ryUrmBYSklC8TCD3ClUyAc0glKpATJ0UkD9avwCqLk9YlWcCD4/9fFVdftFVmShteoC8lLJPUFC8QBrPoz/nW/23+gXWnu5Lkn0au++j+2/4LrMrJd4jTV4RtxTZKVUIH+kzUdkkDhutUUR1TvS67lEe5QWSKe6P2j/H4BR3sGqVdT0j/H4JL9F2a33F0PI6ja6XV/I2zyTmJMOZ3rxj+/2q2ReMkgH5kKq3jd9ifFvqpr3wqzbz/sj4j1USew2iP6kepmEIQkHcBCEIAEIQgAQhCABCEIAEIQgAQhCABCEIAE/adpMJ227SlAWAK8Q0pMq5AOSm6JBSgVICiVX3PaKnSoNftFVkCG4QEEIVCQCCF60cEQgDVfRp/Oj+2/4LqziuUfRsYvR/bf6BdTqO8Fkv8Rqp8J47MqNWqQnKkwolVZ2PSGazlHJTtRR6hQWKW/ccZjn8Aorbn5CevXHpHaROXsCg1GcV1YPuo8ndFdrLq/kkvOLuTRkcimRzHz4hOirkrZKcOD0vVZtt/wBmR3hT3d3vVftj+EfEeqhsbSu+jPoQhUOuCEIQAIQhAAhCEACEIQAIQhAAhCEACEIQAJ221XqFKAmNQUITCBJXqEIA9Cg1+0UIVZcgQ2hCFQkF7K8QgDT/AEd/zg/Q/wBF1Zw6pQhY7/Ea6fCMv4eHwUatohCSORDcdfL0Udy9QoLFHf8Aad4/BV1RCF04eFHlrPuS6v5Gj/pOMQhWIYP1UHa/8I+I9UIQWq8aKBCEKp1QQhCABCEIAEIQgAQhCABCEIA//9k=",
        "2014"
      ),
    };

    const dataMap: Record<string, any> = {
      Movies: movieData,
      "TV Shows": tvData,
      Documentaries: docData,
    };

    const selected = dataMap[activeTab];

    setMovies("trending", selected.trending);
    setMovies("topRated", selected.topRated);
    setMovies("newReleases", selected.newReleases);
    setMovies("recommended", selected.recommended);
    setMovies("action", selected.action);
    setMovies("comedy", selected.comedy);
    setMovies("sciFi", selected.sciFi);
  }, [activeTab, setMovies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <div className="flex justify-between items-center p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent max-sm:text-xl">
          🎬 CineVerse
        </h1>

        <div className="flex items-center space-x-3 max-sm:space-x-2">
          <span className="hidden sm:block text-gray-300 text-sm md:text-base">
            Nitin
          </span>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm md:text-base max-sm:px-2 max-sm:py-1 max-sm:text-xs">
            <LogoutIcon fontSize="small" />
            <span
              className="max-sm:hidden"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/dashboard";
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-4 my-6 overflow-x-auto max-sm:space-x-2 max-sm:my-3 max-sm:px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all max-sm:px-3 max-sm:py-1 max-sm:text-xs ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-screen-xl mx-auto px-6 max-sm:px-2">
        <Slider {...heroSettings}>
          {heroSlides.map((slide) => (
            <div key={slide._id} className="relative h-[70vh] max-sm:h-[40vh]">
              <img
                src={slide.posterUrl}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 rounded-xl max-sm:p-4">
                <h2 className="text-4xl font-bold max-sm:text-lg">
                  {slide.title}
                </h2>
                <p className="text-sm text-gray-300 max-sm:text-xs">
                  {slide.yearOrTime}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="space-y-10 mt-12 px-6 max-sm:space-y-6 max-sm:mt-6 max-sm:px-2">
        <CarouselSection title="Trending Now" movies={trending} />
        <CarouselSection title="Top Rated" movies={topRated} />
        <CarouselSection title="New Releases" movies={newReleases} />
        <CarouselSection title="Recommended" movies={recommended} />
        <CarouselSection title="Action" movies={action} />
        <CarouselSection title="Comedy" movies={comedy} />
        <CarouselSection title="Sci-Fi" movies={sciFi} />
      </div>

      <footer className="mt-12 py-6 text-center text-sm text-gray-500 max-sm:mt-8 max-sm:text-xs">
        © 2025 CineVerse — Designed with ❤️ by Nitin
      </footer>
    </div>
  );
};

export default Home;
