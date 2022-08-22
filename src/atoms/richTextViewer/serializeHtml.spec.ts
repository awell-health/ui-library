import { serializeHtml } from './serializeHtml'
import { Nodes } from '../../types'

const fixtures = [
  { type: 'h1', children: [{ text: 'title 1' }] },
  { type: 'h2', children: [{ text: 'title 2' }] },
  { type: 'h3', children: [{ text: 'title 3' }] },
  { type: 'h3', children: [{ text: 'bold', bold: true }] },
  {
    type: 'h3',
    children: [{ text: 'italic and bold', bold: true, italic: true }],
  },
  { type: 'p', children: [{ text: 'italic', italic: true }] },
  { type: 'p', children: [{ text: 'underline', underline: true }] },
  { type: 'p', children: [{ text: 'strike through', strikethrough: true }] },
  {
    type: 'p',
    children: [
      {
        text: 'strike through underlined',
        strikethrough: true,
        underline: true,
      },
    ],
  },
  {
    type: 'p',
    children: [
      { strikethrough: true, underline: true, text: '' },
      {
        type: 'a',
        url: 'http://localhost:6006/?path=/docs/organisms-wizardform--wizard-form',
        children: [
          {
            text: 'http://localhost:6006/?path=/docs/organisms-wizardform--wizard-form',
          },
        ],
      },
      { text: '' },
    ],
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [{ type: 'lic', children: [{ text: 'bullet list' }] }],
      },
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [{ text: 'bullet list bold', bold: true }],
          },
        ],
      },
    ],
  },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [{ text: 'number list bold', bold: true }],
          },
        ],
      },
      {
        type: 'li',
        children: [{ type: 'lic', children: [{ text: 'number list' }] }],
      },
    ],
  },
  { type: 'p', children: [{ text: '' }] },
  { type: 'p', children: [{ text: '' }] },
  {
    type: 'media_embed',
    url: 'https://www.youtube.com/embed/oJhCGVyRyiw',
    children: [{ text: '' }],
  },
  {
    type: 'img',
    url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUWGBcXFhUVFRUVFRUVFRUWFhUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EAD4QAAEDAgMFBQYFAwIHAQAAAAEAAgMEEQUSITFBUWFxIoGRobEGEzLB0fAjQlJi4RRygjPxFSSSorLC0kP/xAAZAQADAQEBAAAAAAAAAAAAAAACAwQBAAX/xAA0EQABAwMBBQcEAQMFAAAAAAABAAIRAxIhMQQiQVFhEzJxgZGhscHR4fAjM0LxJDRSYsL/2gAMAwEAAhEDEQA/AMI1ia0USppYLp1TU9gkuqWqCo/gpQMRoFkOGq0yWCnJvCnJXZldCLoVhuUfTt0UNV8Fc3JVrSvZdVRm1RTDfQbU94L2haDwVTNFzpF7KbXQ0fbJAOu0DjxHVY1qwmMK+N2qMzhKo5FeJEDmkrmvhWsfqigy6EjCYNdomUo7pRBCmLVeSCynM6yDqJkXaWoTCtJBRscFglVESXJ46QAI6dYEwdUTBOUOYlRLHZWGoBV4gLxosexrpDV2qWAaogtuoyxZSpA6KIXB0LhhCzNurGbLKL73V0bLq9lORKEHKrlj0QJaSm+VU/0+qTUw6EVspdGzRePOiaS01gl07dFogNzqgIIVLEPUIpo0VUovdLacrAhYTddNGpNZZTkKKcrUprm2S8bU5mhzape6nN1XTdhUMOFCy8RX9MuRXBFcFdQhOohogqEWA0TGR1guqsBcVO85XOCGk1U5ZlUFPfaCAhUYzqmcT9EpLu0E0omZiG8SpKw4rhqvHnepRyaqmpd2nDmVQ2XVPbmmgJynpi9605f9Qbv1j/69UjY8tcDsIPmNylHWuY4ObtH3ZP5qZtQ0PaAH7/3Hg7nzU5cWH+TQ8eXQ/fyKZ3xI1CGrKcOaJ2bD8Q4Hj3+qDZsR+Cy5S6F423FjuO8IaopixxYd2zmNxXBxAIOo+Of0PUTxWO/5D9Kh73RHxNJYClcjCE0wqS7cpT6ABOVzTmFRUHehX6o6sjKXg7kW0NAOFh1RlBTKeJOyiyLw/RoQ+ItDnALadCBeUw4bASmCTtLZYFH2DdZCiivIW8CtvhYsCFjDbXA5yupBIMVbZzupS+B1ymWM7Sl9FGSUFhv80J7ytqGIell1RdaAAgKMX1VNSoGQ4LC3ehFzusbqsz7FJsea5Q4GpCidUl1wRZRlTVghLpHXUXgqTmptRwflDdKqkGi8pIy47FKckXBFijsKcWN7Q0dvWinJA0WtEuygXw2KCn2o+sqAXG2zYlkkl3hKtIeVxicK+mjvt3KmOmzPJ3D1R9wPBRzhjS5ehTZIHutlAuj1XqVTVpLjqvFnZhMsK1AiDQo1PwgrpJrtvwQ7qi7EdXN0JJQcpKvo5L6LynaHGxRNHGA4hREgCCtQk2jwnuC6v6An5JNiUVjfgU29kjdzuQ+am2r+iXcgtZ3gqbZpX8igpNpTOGP/AFH8SfVKcRjMbiNugN+ounU5j0CFw0XQNu4LTQSGIZhrxHFZKgluVpRMDGqYEOB4rm4JTN7WTtEjDZ42HfcflcrMRaJIg8DtM+Ib+aQ4RKWP02E6jitPl1zDY7QjjdTUKYN1Ph8D8IwbhKzQs5SaDGV0tE9sxY0t4tBOUuB/TfQnvRZhNrOBBG0EWKCxzAAfXqggostDm5knnhsU2w7TsnuQtfHY2Ti69mdQtPNcyWzVVhzvezAbtp6BTjizNKI9nKTLnef7R80raNqimei1oLnBRpYbzvdbS6b0lQMzhw+iDhblzE9UBR1P4h5rtjPaVbzwAA89UZNuFfipvrzRFFRBrA++p16Id7c4y/uv3JrVM0aE6o4F7gOEe5yhaMysxiUt7qvDR2Uxq8O3nwQkFmiyXtD2mA08FlrgZKYUjQIzfmkshubjijKep7JB2IWN4SHstphw4rSQQAvY23KrlFnAcwjS0AXS6aXW/NLpVLkDhGFbjWsx7vQK+eYNjDT3KnFWl0oI3tv/ANIuq8YbYNPJew6Bcf3KKTJQk7LtuEupwcya0D8zFF1LZ1xsUtxDiCsBgIdrjqT9hDVVXcW7l5W1YFwOgS6XYqRgJjWrx0YXIbOVybb1ToK0rIiNEO1pGiPbOLaqv3YN1LdGVITChLGY4xLrcmwHEW1PopUWYua7cdPD/dP8VpQaeIW+yP4Q2FwAQ33se4jpZt/VS1NoaWTGpj3I+idZmCqcQjujPZWLKJD3eSqmId4o7C25Wu4m/opNpd/E5vOPlCwb8oSrbljQtXI1wjzfmaPoq8VquzZKKupzQMttY8t7jqPmrNlYS108c/vugO8cJrFhlnZm7FKoeWaILA8YOYMO3hxTvFqLOLgWI2jeCNoVJaTrqFhBGqjhsWYi224WkleGxOJ3Eee9ZjBnlsjGneQE+PbbLHu1A6tNwsoZc4cTp5fmETNENiFOJLG+u1pRlPUtf+BMbP2Nfx5dfVI4KwsADtgOXpfYem7wROO0+eMPG0beYU7HG7HpzHL4I6QuuxIRghdG/K8ajYdxHEKONR3aHBRwHEvfs9zMe2NGPO08Aefr1XrpSC6J4sR58CE6N6Qd0+x5H6LDFqXYdPrbitIyzWtaN/2VlqVv4oHNaot38NAvK2k3GByJ9PyioaFL8YeWDmfmhqKnvqjq8gvyu+7JfFUWcRzVlGKUCdCfZcYmSjaYWfbjomUouCOCDp2tLmk7yQ3rbaeQ+YV09RlcGnaQfELQ0ltWpxM+gRNSHE8QIJbvQNK0m5vtQ2MTfiE80Sw5WX4BbSDWsbPJKJLiSjHsAYl5afd5uDrK9smZqlW6QBu8uumFwe0t5LjGvRQml7CSVdQmVYcsYSWrjcWFwByggE7gTsHVI2RgnzXNEuWopiHQukO6OwPM6IDG5rsZbhZFU120gZvuAfWyEpojI9rBtF9uwW2k8AFbfMgZmPx7IjqApUEYjjJO0j7CAgxDVzSq6mtzPLWm7Wm1xsPNUCPt3QBpPf1XHql8jrvPVeVTrK6ubYgjiq4m5jc/C3U/Id6ouBh3BOB0K8jo3EA7Lrlf/wAQtpouWzUXS/kmNUzK8tG4qdM8jaq8Un93MA7Y5rTfnax9EfAwPcwD70UjnFmuhCUWmYTirnBhZyI+nzUcL+F7eOfxytQUz+w5vX6j0RmFPuL8c3/i0qCsz/T46/Mj5RXb/kgnXBuNQdU0pn3tzCR1NR7s23DTw2eSPo61pAcEzaKZe0uAS2mCleOjR3elvsrU5ZwHag7jrqP4uiMamJcRxSbDZMkrXcHDw3r0NkbDMo2DdK2keDtp3zVR2MB91/c7QHuJaB15KrDsRLGgO2J7j0JdS5ByJ6Dd4+ixznAtshtIcXziceEfeZ8llQ6LUgNc5j27nD1REU2Wokad5B8QEnwJpGhOinjcuWbNxDT5InFtzajOs+yVJAV2JUwzOG54I6O3K/2eqhIwxv2t0PciIrTN5keBSJzjBUh2xr9vXipdobc4uZxyPEfcfCJuDPBWYhAaabZ2HbE9pbTtBf8AGzQO/U3gfv1RFTStqI8p27jzQmFsLBY7fhPUbCm06jX0+0HmEVsOhB0EP/MdAU9nktYcSqKemtK5/EeapqJM0zG8NV5jml1bswZka8wibujzUqiMvm02C5J4AJK6NxmygbTp3rQz2ZG9+9xAHS4UacNF5SNjfX781Q8gVXQOZ+w9x5laWAjJVctm31+FuUfXvOqFxyQn3Uv6m2P97dHfJVSVAcSL7TqqaifMx7P0PDx0d2HeeRVUA5hNNx5z54+iU50gpVUwZnBTq2kNyomlcA/VVYjJ27KW9wqWcln9krqJ1tquqnB1huCAlfsA4q8O1smAZ8fosu3YVdbG6QtjaNXachvJPIC57l7WNaZGU7P9OEZ3fueQO0eZ06DRMi9tPC+Z47RAyj9p1aOrjbuSTBXXaZJNTK4knlx8UVPDcaD5P2HumgWtlF+9uLcHXKsrY/cwPcPimdl/tjbYu8XWHcgWscyTI7W4zE9Tp5JxjBs4Ru+ERhn+Vszv/LyT6QN5PT5/AKEY1WNo22cUxp25nW5IaSMtd5K2gfaRMO9lF3jKhi1IcunH1QtUz3UIb+Y6nr/AWibZw6LMY3Jd5HBIpEvdbwGf3zWskkN4apdmXKF1y9JVrU43Te+YSPibqOhA08lL2LlLn2P5fv5L2af3bwDsdceFrI32eowwySD8x9AV5NapbRc0+XwkMdOPNSfvPH5o/CX2aP7j5hqDczRE0NrOFr7CPA39ApargaZak6GUlx8/ivHJpH/SB8kNhTyGub3q72h/12u3OA9bfRWNAa0kb16NOOwb1A+y52niicjJm20zWSODDXCoYxw0LwO6+vldVOqHNeHA2Kcf8XDo3u2SMaSDzPZB/wC5VwAwnjHryXBrmHGQVspKsOeW3BAAHEHS59VksUoTG+4+EnTkVfgZewuz6m4IPEEfwntXCJGlvHVvIpNnZUQw8AB++K4mSYSiB1m3UsTcJMp35RfzQtRLkZlO1DRVPZYeBLT43HqpqANjuqXqtDghs1V49FnHPaOqjQSgacVfVxkhRXFtWOenjw/eqLViK9nqvNG3iOyeo2JxLADrx9Vj8Ln93KRuf6rYUkmZt/u6Olu1S0aHKNhlvgluJSOic142bHDcR9UDRSF0xcPsJxi0OZoA2k/7rPMkdC8XFiDsKNrezraaHHnmPqgeYdnROfaB1omDiR5Kp8wFLJxEbneJAB8EXj8WZrQOOxJKibM2paNghsO5zfqU1zJqD96/IBR3QYS32ef7w3PFXw61LmnY67T/AJAgedj3Kj2QFtvNQil/Fe/91/ArG/7l45Ae6W4AeqliRLCOOw9Qqo35tUZj4BbfmQeo0PyPeluGyg6cFrw0tDxyWWq5/wASPwmmEkuvwtFzz3BvefmhKdwOZx3J7QR+7hvsc/tHjlA08j4uUtWoWiRroPE/pRU2SRKzftfXe9kETTo0623vOnls8VdUU1vdwjZ2Qeg1cltLCXVIJ4l3gjK+vs42Guwd+iuaywspt0GfyjcZhO6VjJnxluozZedgdR5FKfaur/H27yR6oj2XOWW1/gY53ebN/wDZZ/2ozCZpOw5rHj2k+jQtbHUx4cPQyiG8UfVNzMzhB4a/tlEYZUAtylUPhyOdbYUscQltxhF4dUavHNIsfZaU8xdXMmLS0jeST4qONdoNd3JradtWRxTWCHpRlXL265VwqVqcYhzdQbhMsNmIpjfaA5L8cDgwPHXu1B9F5HXtEYB3tXi1GOfTaOqkBICb4Qc8bSdu/wAkS2PI/uKFwQgADcdR3plWDsgqCof5C3gUcS1Z72gh/FYdzgQO6x+Z8FRVaMb97kTjpNo3D8sgv0IsVRW/D4r06MhjQeH0P2hIJyEjqz2AealRdqN/Fzo2X5Elx82tVsEeZrha/ZdYc8psfFdSx5IowdrpHPPRtmjzDl6DO6Qng7pTrCcVEnZPxDZzAT2mmuLcNQvm1FOWvaeBW8p5dA771SdpORPJKqU7HY0UvaOmztErd3xAeqz1G+4c22gsTyvp9FsIHDUbnBZGemdBUOjdseOydxsb2U9B90sJyFsSCtBgkWc6/k2/JOZm5hfv7kFGBDS597gP48rInC6oPjHEady8raHFwvHAx9/da0CI4nKSYnFkdf8AyHzCa4PiWoBOjtnVTxCgMkZLRcs1tvI3+Xos3K8hum1puFVSPatGc/v+UqCwrZ4078O/P1QUFQybLHLo4EZH9/wnqp0lSJ4OYtdLYRaZo4Ot5p1Q22vHLPWFxJmU4rKr8Uh3wtuTysPqUqng91/Ua3a6O4PIuCurXl8cjt+cs6tBv5dnxSfCsRc+CWN2pY2wJ4ZhoqWNuAk8Jz14Ipkz+8VHBn6EDbY+apqhkszedSqsDntmPAIV8xe5zipi0is7lj1WEZKd4sbx33Oa13flGb75LN0c+UlainIkp28szT0ufqFiqklry3eCQe5N2UXB1M8ExrZkLQ4V+I9kQ2E5nf2jU+Og70zqMWzySBp7LBlHP9R7z8kmpZP6andN/wDpL+FFyH5nDz7w1D4M4tu4jTTbv1WVKAe4ngMDxwT6DHqtIgSEXh9SB7yQ7hbxSuoqS5+u4371GqJY0NP6nE/4mwS8zXN1cKW9ciYzitpgD+zJJvyhviSfkEL7aQ/gwycHPB7z/CjhM2Skcb6uebdGgD5lGYrH76nLeBcR12hc54Zb+6yhabXrM0ExATRkoe3ySCkltcIqnqLHvQ1KcnCJ7JOF5P2XgHh80dUQ5oxbj6hC1zc2o2hF0zrR2PC6Fz8ArCcAr2HD4MozP13rlnZJjc6rxMNB5/uVHZu5rYVZD2ZePzNvmsw+Q3I4Cyf0z9BfgT5tSHEAGyyD91+46/NTbOIcW+fvCRS4haL2ZnJZfc0kX7rhav4m2WJ9lJbZ7HgfULZwS3A6LzNvZFUwt0cQl2Vrrxu7kHVxaEL3HXmN7XjZfVee9zC/FPYT2YfwUr8BI8Nk7ZYODv4UpCckYO0MffqXPd9FRQjLUEf3el1dVntkfpAB6b16gIafRPPejn+UqpGXcAtjhkubs8vRZODsPPLYnvsvU3fKT+VhKVtQuBPIfKKqLitHAbBTxGgFQ1mtnscCDy3jwUA27bhWQy214LzJ3rhqEpuArvaJo92Ih+n/AG80o9k6u5LDtGneFGrqi55JOz0Sqmm9zVcn695Oqyns57J1I6xKG+5x6fT8L6LA7K4HdsPRJ/bDCRGRKwfhv0P7XfymFPKHN6phTETRvgfsIt04ELzaNU0X3Hhr4KpoFRtvp4rA+ydaRP7rc4HyBPyWgnjAmaejvI/RZSgpnQYg2N20Fwv/AIuWibPmksf0uaO7Nb1XtV4JDegI85H0SHi1dUvytjbv1c7q+zj5EDuS4QZY6kiwAa23Ml9z6eapFRnncy+8+QH0U3uJaeeh5jQ/TwVNXccDw09EqbVnoazLcfqU5HZY78UFPpIQdLGysxCa4ATHMl466+SoLJcFq8FAFI073lx8Dp5LNYxSONSGtGsmXL1d2T5gp3HN7uGlbfaAD/kPrZSq8jGmd3xNaY2ngZNp6hubxSacsrTGs+3+EIdD0LiIjc9t3XijblZuvYlpPflCBkxL3krWNFmXHehMV+GMjYW/z81Vg0d5m9VUxgDLj1+vymgbhJ6q32kk/FI4X8ySlrSjca1meeZHgSEFZNp9weATGCGBaZ8obTxsA1yknq43Kb4frG/mGuHe36hZ/EDo0ftt5BP8Nb+AHcWjyJUe1GWeYU7efisTM3LI4cyoxv1RGNMtLfigWu1VrTIDlQMgFHQVF7hWtqtbFL4HWKIniLbHigLGzlCWiVT7gnYL9y5GxzWAtdcnXBHeVzq9waLbWm3VpQ+IyB7hIN4APIgW+SjOO11UYXW27N6WKbZka/fUIA0DIR/s5Plk1/MLfNbOjfp3rHNZG2BxB7Ye1wvvbsICf4PU5owevyXlbcy43R0/KXU1uRWOw+8jI37klwmXsWO5NZZrghLWO1II7W88eBS6EikWHxU5dIIVQhy1AdxB89PqvKqP8V3MN87hFT6gO3i3qF5VHttPFp8iCqO0MDwj0XXH2SWrj7Afw7J5fZ9UR7LS2Mw4xO9Qpx2c6SM/nzW6u1v6HuUvZWDty33MIPUkD5JznfxOHh6HP3VLXS0j9ytphWrLHghappYSdyLoRbXuVOOjMw2Xjsd/L0KW4bqT6e8sdhCWYwLZXb2lEU9RmAO8Gx7lDG23HUeYXqxa9pPgUlm68StJgFddgTOKryTA37Luz37vp3rB+zlbplvqFqqxmanJ3gLzNq2ZrameOEwEsdbyUfbCENmhqQNhDXngT8Dvl4IT3vbzfuPovIMS/rYDG4WdbKf7mjM14HcD3IIE5bnbv6706i1zQ1r9W7vlqPr5QurmSh8Hl/5iUncD4l7PlmR3vNBzSVhyzPO42PqmZN225q+vmOSGpoPBLsdo9Pet2jR/dsPhZKqyUG1uC097ix13EffK6zuLwBjwxo0DRbmDrdM2Y5tPDTwTtndODwRldU/hs5W9Ewxo5qbLvADyP3aE+RslzY87o2nYO07+1ouR37O9ESVWdzmnffz0REBtORr9JBPwgOCI4Z90FX6wRngB6KnAT+KCdgVtQPwAOAHkTdCQPytJ/afPT5o2jccPH3TANwjqVz35zfe7XxN17URAWCqpTqDwV7XXcDzCaU7Qo3EH9sjhceie0byIQOSQ1DM0g53TWqfaHRQVoNrVKdAEkxtwdZw3aJS1H1BJBugI9qspiGwqmaQrG7uqdVjMzW9EkduTyWTsDoEraJBaQgq4gpWuXjpF6nXI4Q7pLgKTSrYYRnDTsufRUDaRwRGCIC2EXE8bDvTzBH5Rl5kjobfRZlxuOf3YprglRfQ7R5qfaG30ylVW7qbVE1n966cjMCh8X0AcN23ooCe7QVC1ktDh4Ka2QCjnDQqiqkFozfabeIP0Vkclwk2MS9jLwdceaKiy8gdfoVlNsmF1TJllv0Py+Seez0famPEX8TdZJsznG5NyBbqBqtf7Oyfgk8dO4HRO2hpbT8oT3C0D0Tt1QGt++9VNmzgg70oxWoNgBvIHij4hlDT3KLsdy7ilPJgFJquAwy/tf6q3ENY78EwxaESMseoPAjelcbs8ZbtI0VDH3tBOqwwYckcMhjluOK+iYZKJIiOIWJwiiEjy9+jIxd5PLctD7P4kH3NrAkgDpb6rNuHaMgatifHgm1YkHyKRwz/00+2zS6x5a9k91/NOGkOEgG4kjvF/W6Ax6jEkuS9nkXZfY7izrwXvs5IS4xuvmy2N9t26Dy07kdYXURV6D2KxwubP74oaYb94uEZA7Ug8vQKipFnuHEL2hdc7b6D0XVM05/cpZy1GSaG+46HkRqCj4MMZNHncO0304ePqgQ24sm+EPyREHhbqFJUqEU905BwuokTlZqVwjdK7mGAchYu+XgkLKg+8vyt8/mmtZNaW20Nzv6kAuF/ILPk9pexTbuieSqY3ElOag/hjmHepQT29nr6IiR942f5Dzv8ANCyv0++iKmMLmBVXsEVQ6uHVAvROHus9oRu7pTDoU7aO1fqo4nMcoG5WRsuLobFD2g3kpGiXhTNEuQJKBcLEojNqqpzqquKpC9I0TKM5mBL3fCERSydmyXWEtBQvGJQkx1K5XxsBHjv5rlsIoVm9rt42oOo0dfij4xdBVTUQiVzTwUSURRy5XAoMFTicuc2QtIlaPEH3Z1CVUshtqjY35ouiUtJDlPQbALUim3BCbwTaIGtfcEc1Jj0LUuWU2by5jcqpoykFaXCZbMy8lmHG6cUEtvBMrtuYtrCWq+omvI0cwtbiDA1jOl1lKQ37R2lwaOhIutNjktrcmrztoO8xg6/CEjcPp7oYvu1Zmgm93MWE6HT6J7QzBzQeSSvpwagE/C3tO6NN0+kAA8HklUo3geSvxmsEcPuGCxe4ueeI3BeYfP7uJj92cjyAJ6bPsKjE2e/DHsGrjbpfj02oF1XnDmj4WtAYOTTt6nUnmSnU6YNPTUknx4p7Wgsg+ad+0mrWSDa0+qEwmtJqGPO06O58+qtoX++hcw7QNOo2JP7tzHC+mwg8RuIKykwWuonqPVDTG6WnUStHjjcsgPX6pdQTZZsp2H7+aMxqTM2N+5zQe8JLLJZ7T5pezsupWnksY2RC1fNQxDE8jMo2kgAdUNQ1F4xre28b0pxea7geCTRoXVbXcEljN+F7UuBu/ixw/hJSi4X9ktO+9uu9CWXrNCtY2BCMZJ2QOBJ8QPoqnjRShHyXVYstWxBQ7tqKw6PthDQsLindDFbVBVda3K55AamMAs3VA4gy5zLq+ry2AXPku0KSmD3khoIylMgVMm5HVEaDI1VgMhPBleOdopU8lgVXIV5EVmrVvBW3suUHSarkyFqMhcvKkLlynacpfFA2XgK5cnJiZ4dNoQhnSZXXXLksNFxQAbxV0R1sh6jauXIW95YNVXYZrI+A7V6uRVNFr9EZTnK+JnAtJ7v5umOPVJtIeQC5coCJqtPT/wBJI1CX4BVflUMcdlBttft/t4eK5cqgB2y60dvCFw2U5HMv8QcB4WPkbd6WxusV4uTmd93knDUpngs+R9r7bhQmqS8gHZqQOBO23JeLkBYO0J6BYRvE+CZNOelB/Q63cR/slsrRpcLlyClhzh/2KFuD5ojDyWk2N2n7GijWN11XLlx/rLD30vlf2gBuHntK8lGt+Oq9XKoaJytpdvd8wvcQGoXq5Ye8s/uV9FSk2TCqcGNsFy5QPcXVMpDjLwCk1bLchEOls1cuVoG6E+NFIOuEK5mq5cuHFYNSh5Qq2FcuRNRrnLly5GsX/9k=',
    children: [{ text: '' }],
  },
  { type: 'p', children: [{ text: '' }] },
]

const fixturesOutput = `<h1>title 1</h1><h2>title 2</h2><h3>title 3</h3><h3><span class="bold">bold</span></h3><h3><span class="bold italic">italic and bold</span></h3><p><span class="italic">italic</span></p><p><span class="underline">underline</span></p><p><span class="strikethrough">strike through</span></p><p><span class="strikethrough underline">strike through underlined</span></p><p><a>http://localhost:6006/?path=/docs/organisms-wizardform--wizard-form</a></p><ul><li><lic>bullet list</lic></li><li><lic><span class="bold">bullet list bold</span></lic></li></ul><ol><li><lic><span class="bold">number list bold</span></lic></li><li><lic>number list</lic></li></ol><p></p><p></p><media_embed></media_embed><img></img><p></p>`

it('Should correctly parse nodes to html string', () => {
  const rendered = serializeHtml(fixtures as unknown as Nodes)
  expect(rendered).toContain(fixturesOutput)
})
