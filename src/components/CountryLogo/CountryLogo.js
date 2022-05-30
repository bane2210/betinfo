import React from 'react';
import classes from './CountryLogo.module.css';

import Ball from '../../assets/images/soccer-ball-64.png';

import Albania from '../../assets/flags/Albania-Flag-32.png';
import Azerbaijan from '../../assets/flags/Azerbaijan-Flag-32.png';
import Algeria from '../../assets/flags/Algeria-Flag-32.png';
import Argentina from '../../assets/flags/Argentina-Flag-32.png';
import Armenia from '../../assets/flags/Armenia-Flag-32.png';
import Australia from '../../assets/flags/Australia-Flag-32.png';
import Austria from '../../assets/flags/Austria-Flag-32.png';
import Bahrain from '../../assets/flags/Bahrain-Flag-32.png';
import Bangladesh from '../../assets/flags/Bangladesh-Flag-32.png';
import Belarus from '../../assets/flags/Belarus-Flag-32.png';
import Belgium from '../../assets/flags/Belgium-Flag-32.png';
import Bolivia from '../../assets/flags/Bolivia-Flag-32.png';
import Bosnian from '../../assets/flags/Bosnian-Flag-32.png';
import Brazil from '../../assets/flags/Brazil-Flag-32.png';
import Bulgaria from '../../assets/flags/Bulgaria-Flag-32.png';
import Cameroon from '../../assets/flags/Cameroon-Flag-32.png';
import Canada from '../../assets/flags/Canada-Flag-32.png';
import Chile from '../../assets/flags/Chile-Flag-32.png';
import China from '../../assets/flags/China-Flag-32.png';
import Colombia from '../../assets/flags/Colombia-Flag-32.png';
import Costa_Rica from '../../assets/flags/Costa-Rica-Flag-32.png';
import Croatia from '../../assets/flags/Croatia-Flag-32.png';
import Czech_Republic from '../../assets/flags/Czech-Republic-Flag-32.png';
import Cyprus from '../../assets/flags/Cyprus-Flag-24.png';
import Denmark from '../../assets/flags/Denmark32.png';
import Ecuador from '../../assets/flags/Ecuador-Flag-32.png';
import Egypt from '../../assets/flags/Egypt-Flag-32.png';
import El_Salvador from '../../assets/flags/El-Salvador-Flag-32.png';
import England from '../../assets/flags/England-Flag-32.png';
import Estonia from '../../assets/flags/Estonia-32.png';
import Faroe_Islands from '../../assets/flags/Faroe-Islands-32.png';
import Finland from '../../assets/flags/Finland-Flag-32.png';
import France from '../../assets/flags/France-Flag-32.png';
import Georgia from '../../assets/flags/Georgia-Flag-32.png';
import Germany from '../../assets/flags/Germany-Flag-32.png';
import Ghana from '../../assets/flags/Ghana-Flag-32.png';
import Greece from '../../assets/flags/Greece-Flag-32.png';
import Honduras from '../../assets/flags/Honduras-Flag-32.png';
import Hungary from '../../assets/flags/Hungary-Flag-32.png';
import Iceland from '../../assets/flags/Iceland-Flag-32.png';
import India from '../../assets/flags/India-Flag-32.png';
import Iran from '../../assets/flags/Iran-Flag-32.png';
import Iraq from '../../assets/flags/Iraq-Flag-32.png';
import Ireland from '../../assets/flags/Ireland-Flag-32.png';
import Israel from '../../assets/flags/Israel-Flag-32.png';
import Italy from '../../assets/flags/Italy-Flag-32.png';
import Japan from '../../assets/flags/Japan-Flag-32.png';
import Jordan from '../../assets/flags/Jordan-Flag-32.png';
import Kazakhstan from '../../assets/flags/Kazakhstan-Flag-32.png';
import South_Korea from '../../assets/flags/Korea-Flag-32.png';
import Kuwait from '../../assets/flags/Kuwait-Flag-32.png';
import Latvia from '../../assets/flags/Latvia-Flag-32.png';
import Lithuania from '../../assets/flags/Lithuania-Flag-32.png';
import Macedonia from '../../assets/flags/Macedonia-Flag-32.png';
import Malaysia from '../../assets/flags/Malaysia32.png';
import Malta from '../../assets/flags/Malta-Flag-32.png';
import Mexico from '../../assets/flags/Mexico-Flag-32.png';
import Moldova from '../../assets/flags/Moldova-Flag-32.png';
import Montenegro from '../../assets/flags/Montenegro32.png';
import Morocco from '../../assets/flags/Morocco-Flag-32.png';
import Netherlands from '../../assets/flags/Netherlands-Flag-32.png';
import New_Zealand from '../../assets/flags/New-Zealand32.png';
import Nicaragua from '../../assets/flags/Nicaragua-Flag-32.png';
import Nigeria from '../../assets/flags/Nigeria-Flag-32.png';
import North_Macedonia from '../../assets/flags/North-Macedonia-Flag-32.png';
import Northern_Ireland from '../../assets/flags/Northern-Ireland-32.png';
import Norway from '../../assets/flags/Norway-Flag-32.png';
import Pakistan from '../../assets/flags/Pakistan-Flag-32.png';
import Panama from '../../assets/flags/Panama-Flag-32.png';
import Paraguay from '../../assets/flags/Paraguay-Flag-32.png';
import Peru from '../../assets/flags/Peru-Flag-32.png';
import Philippines from '../../assets/flags/Philippines-Flag-32.png';
import Poland from '../../assets/flags/Poland-Flag-32.png';
import Portugal from '../../assets/flags/Portugal-Flag-32.png';
import Qatar from '../../assets/flags/Qatar-Flag-32.png';
import Romania from '../../assets/flags/Romania-Flag-32.png';
import Russia from '../../assets/flags/Russia-Flag-32.png';
import Saudi_Arabia from '../../assets/flags/Saudi-Arabia-Flag-32.png';
import Scotland from '../../assets/flags/Scotland-32.png';
import Senegal from '../../assets/flags/Senegal-Flag-32.png';
import Serbia from '../../assets/flags/Serbia-Flag-32.png';
import Singapore from '../../assets/flags/Singapore-Flag-32.png';
import Slovakia from '../../assets/flags/Slovakia-Flag-32.png';
import Slovenia from '../../assets/flags/Slovenia-Flag-32.png';
import South_Africa from '../../assets/flags/South-Africa-Flag-32.png';
import Spain from '../../assets/flags/Spain-Flag-32.png';
import Sweden from '../../assets/flags/Sweden-Flag-32.png';
import Switzerland from '../../assets/flags/Switzerland-Flag-32.png';
import Taipei from '../../assets/flags/Taiwan-Flag-32.png';
import Tajikistan from '../../assets/flags/Tajikistan-Flag-32.png';
import Thailand from '../../assets/flags/Thailand-Flag-32.png';
import Tunisia from '../../assets/flags/Tunisia-Flag-32.png';
import Turkey from '../../assets/flags/Turkey-Flag-32.png';
import Turkmenistan from '../../assets/flags/Turkmenistan-Flag-32.png';
import Uganda from '../../assets/flags/Uganda-Flag-32.png';
import Ukraine from '../../assets/flags/Ukraine-Flag-32.png';
import United_States from '../../assets/flags/United-States-Flag-32.png';
import Uruguay from '../../assets/flags/Uruguay-Flag-32.png';
import Uzbekistan from '../../assets/flags/Uzbekistan-Flag-32.png';
import Venezuela from '../../assets/flags/Venezuela-Flag-32.png';
import Vietnam from '../../assets/flags/Vietnam-Flag-32.png';
import Wales from '../../assets/flags/Wales-32.png';




const countryLogo = (props) => {



    const loadFlag = (name) => {

        let countryName;
        switch(name){

            case "albania": { countryName = Albania; break; }
            case "azerbaijan": { countryName = Azerbaijan; break; }
            case "algeria": { countryName = Algeria; break; }
            case "argentina": { countryName = Argentina; break; }
            case "armenia": { countryName = Armenia; break; }
            case "australia": { countryName = Australia; break; }
            case "austria": { countryName = Austria; break; }
            case "bahrain": { countryName = Bahrain; break; }
            case "bangladesh": { countryName = Bangladesh; break; }
            case "belarus": { countryName = Belarus; break; }
            case "belgium": { countryName = Belgium; break; }
            case "bolivia": { countryName = Bolivia; break; }
            case "bosnia and herzegovina": { countryName = Bosnian; break; }
            case "brazil": { countryName = Brazil; break; }
            case "bulgaria": { countryName = Bulgaria; break; }
            case "cameroon": { countryName = Cameroon; break; }
            case "canada": { countryName = Canada; break; }
            case "chile": { countryName = Chile; break; }
            case "china": { countryName = China; break; }
            case "colombia": { countryName = Colombia; break; }
            case "costa rica": { countryName = Costa_Rica; break; }
            case "croatia": { countryName = Croatia; break; }
            case "cyprus": { countryName = Cyprus; break; }
            case "czech republic": { countryName = Czech_Republic; break; }
            case "denmark": { countryName = Denmark; break; }
            case "ecuador": { countryName = Ecuador; break; }
            case "egypt": { countryName = Egypt; break; }
            case "el salvador": { countryName = El_Salvador; break; }
            case "england": { countryName = England; break; }
            case "estonia": { countryName = Estonia; break; }
            case "faroe islands": { countryName = Faroe_Islands; break; }
            case "finland": { countryName = Finland; break; }
            case "france": { countryName = France; break; }
            case "georgia": { countryName = Georgia; break; }
            case "germany": { countryName = Germany; break; }
            case "ghana": { countryName = Ghana; break; }
            case "greece": { countryName = Greece; break; }
            case "honduras": { countryName = Honduras; break; }
            case "hungary": { countryName = Hungary; break; }
            case "iceland": { countryName = Iceland; break; }
            case "india": { countryName = India; break; }
            case "iran": { countryName = Iran; break; }
            case "iraq": { countryName = Iraq; break; }
            case "ireland republic": { countryName = Ireland; break; }
            case "israel": { countryName = Israel; break; }
            case "italy": { countryName = Italy; break; }
            case "japan": { countryName = Japan; break; }
            case "jordan": { countryName = Jordan; break; }
            case "kazakhstan": { countryName = Kazakhstan; break; }
            case "south korea": { countryName = South_Korea; break; }
            case "kuwait": { countryName = Kuwait; break; }
            case "latvia": { countryName = Latvia; break; }
            case "lithuania": { countryName = Lithuania; break; }
            case "macedonia": { countryName = Macedonia; break; }
            case "malaysia": { countryName = Malaysia; break; }
            case "malta": { countryName = Malta; break; }
            case "mexico": { countryName = Mexico; break; }
            case "moldova": { countryName = Moldova; break; }
            case "montenegro": { countryName = Montenegro; break; }
            case "morocco": { countryName = Morocco; break; }
            case "netherlands": { countryName = Netherlands; break; }
            case "new zealand": { countryName = New_Zealand; break; }
            case "nicaragua": { countryName = Nicaragua; break; }
            case "nigeria": { countryName = Nigeria; break; }
            case "north macedonia": { countryName = North_Macedonia; break; }
            case "north ireland": { countryName = Northern_Ireland; break; }
            case "norway": { countryName = Norway; break; }
            case "pakistan": { countryName = Pakistan; break; }
            case "panama": { countryName = Panama; break; }
            case "paraguay": { countryName = Paraguay; break; }
            case "peru": { countryName = Peru; break; }
            case "philippines": { countryName = Philippines; break; }
            case "poland": { countryName = Poland; break; }
            case "portugal": { countryName = Portugal; break; }
            case "qatar": { countryName = Qatar; break; }
            case "romania": { countryName = Romania; break; }
            case "russia": { countryName = Russia; break; }
            case "saudi arabia": { countryName = Saudi_Arabia; break; }
            case "scotland": { countryName = Scotland; break; }
            case "senegal": { countryName = Senegal; break; }
            case "serbia": { countryName = Serbia; break; }
            case "singapore": { countryName = Singapore; break; }
            case "slovakia": { countryName = Slovakia; break; }
            case "slovenia": { countryName = Slovenia; break; }
            case "south africa": { countryName = South_Africa; break; }
            case "spain": { countryName = Spain; break; }
            case "sweden": { countryName = Sweden; break; }
            case "switzerland": { countryName = Switzerland; break; }
            case "taipei": { countryName = Taipei; break; }
            case "tajikistan": { countryName = Tajikistan; break; }
            case "thailand": { countryName = Thailand; break; }
            case "tunisia": { countryName = Tunisia; break; }
            case "turkey": { countryName = Turkey; break; }
            case "turkmenistan": { countryName = Turkmenistan; break; }
            case "uganda": { countryName = Uganda; break; }
            case "ukraine": { countryName = Ukraine; break; }
            case "united states": { countryName = United_States; break; }
            case "uruguay": { countryName = Uruguay; break; }
            case "uzbekistan": { countryName = Uzbekistan; break; }
            case "venezuela": { countryName = Venezuela; break; }
            case "vietnam": { countryName = Vietnam; break; }
            case "wales": { countryName = Wales; break; }

            default: countryName = Ball;
    
        }

        return countryName;
         
    }


    const cName = loadFlag(props.co.toLowerCase());



    return (
        <div className={classes.imgContainer}>
            <img className={classes.flagImg} src={cName} alt="countryLogo" />
        </div>

    );
}

export default countryLogo;