import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const statesAndCities = {
  "Andhra Pradesh": {
    Visakhapatnam: [
      "Gajuwaka",
      "Madhurawada",
      "Seethammadhara",
      "Dwaraka Nagar",
      "Kancharapalem",
    ],
    Vijayawada: [
      "Benz Circle",
      "Bhavanipuram",
      "Gunadala",
      "Mogalrajapuram",
      "Patamata",
    ],
    Guntur: [
      "Arundelpet",
      "Brodipet",
      "Gorantla",
      "Nallapadu",
      "Sunnapubattilu",
    ],
    Nellore: [
      "Buja Buja Nellore",
      "Dargamitta",
      "Jonnawada",
      "Magunta Layout",
      "VRC Centre",
    ],
    Kurnool: ["B Camp", "Budhwarpet", "C Camp", "Kallur", "Santoshnagar"],
  },
  "Arunachal Pradesh": {
    Itanagar: [
      "Gohpur Tinali",
      "Jullang",
      "Niti Vihar",
      "Naharlagun",
      "Zero Point",
    ],
    Naharlagun: [
      "Banderdewa",
      "Lekhi",
      "Papum Pare",
      "Pappu Hill",
      "Vivek Vihar",
    ],
    Pasighat: ["GTC", "IGJ Hr Sec School", "JNC", "Raneghat", "Sawmill"],
    Tawang: ["Budh Basti", "Khinmey", "Kitpi", "Lama Camp", "Lhou"],
    Ziro: ["Bulla", "Hong", "Old Ziro", "Siiro", "Tajang"],
  },
  Assam: {
    Guwahati: ["Beltola", "Chandmari", "Dispur", "Paltan Bazaar", "Ulubari"],
    Silchar: [
      "Ambicapatty",
      "Malugram",
      "Meherpur",
      "Tarapur",
      "Uttar Krishnapur",
    ],
    Dibrugarh: [
      "Boiragimoth",
      "Chowkidingee",
      "Jhalukpara",
      "Lahoal",
      "Mancotta",
    ],
    Jorhat: ["Cinnamara", "Garali", "JPR", "Tarajan", "Tilikiaam"],
    Tezpur: [
      "Bihaguri",
      "Kacharigaon",
      "Mahabhairab",
      "Mission Chariali",
      "Tumuki",
    ],
  },
  Bihar: {
    Patna: [
      "Boring Road",
      "Kankarbagh",
      "Patliputra Colony",
      "Rajendra Nagar",
      "Sri Krishna Puri",
    ],
    Gaya: ["A P Colony", "Chandauti", "Judge Road", "Magadh Colony", "Rampur"],
    Bhagalpur: ["Adampur", "Aliganj", "Barari", "Mirjanhat", "Tatarpur"],
    Muzaffarpur: [
      "Ahiyapur",
      "Bairiya",
      "Mithanpura",
      "Sadar Bazar",
      "Shivshankar",
    ],
    Purnia: [
      "Bhatta Bazar",
      "Chunapur Road",
      "Gulabbagh",
      "Kasba",
      "Line Bazar",
    ],
  },
  Chhattisgarh: {
    Raipur: [
      "Amlidih",
      "Byron Bazar",
      "Daldal Seoni",
      "Tatibandh",
      "Vidhansabha Road",
    ],
    Bhilai: [
      "Civic Centre",
      "Hudco",
      "Nehru Nagar",
      "Power House",
      "Sundar Nagar",
    ],
    Bilaspur: [
      "Bodri",
      "Jarhabhata",
      "Rajkishore Nagar",
      "Sarkanda",
      "Tikrapara",
    ],
    Korba: ["Balco", "Darri", "Jamnipali", "Pump House", "Transport Nagar"],
    Durg: ["Adarsh Nagar", "Bhatti", "Borsi", "Gurudwara Colony", "Maroda"],
  },
  Goa: {
    Panaji: ["Altinho", "Campal", "Miramar", "St. Inez", "Taleigao"],
    Margao: ["Aquem", "Borda", "Fatorda", "Navelim", "Seraulim"],
    "Vasco da Gama": ["Baina", "Chicalim", "Dabolim", "Mangor", "Sada"],
    Mapusa: ["Aldona", "Karaswada", "Khorlim", "Mapusa Market", "Siolim"],
    Ponda: ["Borim", "Dhulapi", "Farmagudi", "Marcaim", "Tisk"],
  },
  Gujarat: {
    Ahmedabad: ["Bodakdev", "Gota", "Maninagar", "Navrangpura", "Satellite"],
    Surat: ["Adajan", "City Light", "Ghod Dod Road", "Piplod", "Vesu"],
    Vadodara: ["Alkapuri", "Fatehgunj", "Karelibaug", "Manjalpur", "Nizampura"],
    Rajkot: ["Kalavad Road", "Kothariya", "Mavdi", "Nana Mava", "Raiya"],
    Bhavnagar: ["Kaliyabid", "Krishna Nagar", "Nari", "Sidsar", "Vidhyanagar"],
  },
  Haryana: {
    Chandigarh: ["Daria", "Manimajra", "Sector 10", "Sector 22", "Sector 35"],
    Faridabad: [
      "Ballabgarh",
      "Greenfield Colony",
      "NIT",
      "Old Faridabad",
      "Sector 21",
    ],
    Gurugram: [
      "DLF Phase 1",
      "DLF Phase 2",
      "Palam Vihar",
      "Sohna Road",
      "Udyog Vihar",
    ],
    Hisar: [
      "Aggarsain Colony",
      "Dabra Chowk",
      "Model Town",
      "Sector 13",
      "Urban Estate",
    ],
    Panipat: [
      "Assandh Road",
      "Gohana Road",
      "Model Town",
      "Sector 11",
      "Sector 25",
    ],
  },
  "Himachal Pradesh": {
    Shimla: [
      "Chotta Shimla",
      "Khalini",
      "Lakkar Bazar",
      "Sanjauli",
      "Summer Hill",
    ],
    Manali: [
      "Aleo",
      "Gompa Road",
      "Hadimba Temple Road",
      "Mall Road",
      "Naggar Road",
    ],
    Dharamshala: ["Bhagsu", "Kangra", "Mcleodganj", "Sidbari", "Yol"],
    Kullu: ["Akhara Bazaar", "Bhuntar", "Manikaran", "Sarvari", "Sultanpur"],
    Solan: ["Baddi", "Chambaghat", "Mall Road", "Nalagaarh", "Saproon"],
  },
  Jharkhand: {
    Ranchi: ["Ashok Nagar", "Doranda", "Harmu", "Lalpur", "Morabadi"],
    Jamshedpur: ["Bistupur", "Kadma", "Mango", "Sakchi", "Sonari"],
    Dhanbad: ["Baramuri", "Hirapur", "Jharia", "Saraidhela", "Srirampur"],
    Bokaro: [
      "Chas",
      "Co-operative Colony",
      "Naya More",
      "Sector 4",
      "Sector 9",
    ],
    Deoghar: [
      "Castairs Town",
      "Jalsar Road",
      "Rohini Road",
      "Satsang Nagar",
      "Williams Town",
    ],
  },
  Karnataka: {
    Bengaluru: [
      "Basavanagudi",
      "Indiranagar",
      "Jayanagar",
      "Koramangala",
      "Whitefield",
    ],
    Mysuru: [
      "Gokulam",
      "Hebbal",
      "Jayalakshmipuram",
      "Saraswathipuram",
      "VV Mohalla",
    ],
    Mangaluru: ["Balmatta", "Bejai", "Kavoor", "Kodialbail", "Pumpwell"],
    Hubballi: [
      "Deshpande Nagar",
      "Gokul Road",
      "Keshwapur",
      "Old Hubli",
      "Vidyanagar",
    ],
    Belagavi: [
      "Bhagya Nagar",
      "Hindwadi",
      "Raviwar Peth",
      "Tilakwadi",
      "Vadgaon",
    ],
  },
  Kerala: {
    Thiruvananthapuram: [
      "Kazhakoottam",
      "Kowdiar",
      "Pattom",
      "Sreekariyam",
      "Vattiyoorkavu",
    ],
    Kochi: ["Edappally", "Fort Kochi", "Kadavanthra", "Kakkanad", "Vyttila"],
    Kozhikode: [
      "Bilathikulam",
      "Kottooli",
      "Mankavu",
      "Nadakkavu",
      "Thondayad",
    ],
    Thrissur: ["Ayyanthole", "Kottappuram", "Ollur", "Punkunnam", "West Fort"],
    Kollam: [
      "Anchal",
      "Chinnakada",
      "Karunagappally",
      "Kottarakkara",
      "Paravur",
    ],
  },
  "Madhya Pradesh": {
    Bhopal: [
      "Arera Colony",
      "Bairagarh",
      "Gulmohar",
      "Kolar Road",
      "Shyamla Hills",
    ],
    Indore: ["Annapurna", "Bhawarkua", "MG Road", "Rajwada", "Vijay Nagar"],
    Gwalior: ["City Centre", "DD Nagar", "Lashkar", "Morar", "Thatipur"],
    Jabalpur: [
      "Adhartal",
      "Garha",
      "Madan Mahal",
      "Napier Town",
      "Sadar Bazar",
    ],
    Ujjain: [
      "Anandganj",
      "Freeganj",
      "Indore Gate",
      "Mahakal Vanijya Kendra",
      "Nanakheda",
    ],
  },
  Maharashtra: {
    Mumbai: ["Andheri", "Bandra", "Juhu", "Powai", "Worli"],
    Pune: ["Aundh", "Baner", "Kothrud", "Shivaji Nagar", "Wakad"],
    Nagpur: [
      "Civil Lines",
      "Dharampeth",
      "Manish Nagar",
      "Ramdas Peth",
      "Sitabuldi",
    ],
    Thane: [
      "Ghodbunder Road",
      "Kopri",
      "Naupada",
      "Vartak Nagar",
      "Wagle Estate",
    ],
    Nashik: [
      "College Road",
      "Gangapur Road",
      "Indira Nagar",
      "Pathardi Phata",
      "Panchavati",
    ],
  },
  Manipur: {
    Imphal: ["Khwairamband", "Lamphel", "Langjing", "Porompat", "Thangmeiband"],
    Thoubal: ["Athokpam", "Heirok", "Khangabok", "Salungpham", "Yairipok"],
    Bishnupur: [
      "Kwasiphai",
      "Loktak",
      "Nambol",
      "Ngaikhong Khullen",
      "Phubala",
    ],
    Churachandpur: ["Henglep", "Lamka", "Saikot", "Singngat", "Tuilaphai"],
    Ukhrul: [
      "Lungchong",
      "Phungyar",
      "Somdal",
      "Ukhrul Headquarters",
      "Wino Bazar",
    ],
  },
  Meghalaya: {
    Shillong: ["Bishnupur", "Laitumkhrah", "Lummawrie", "Nongthymmai", "Polo"],
    Tura: ["Araimile", "Chandmary", "Rongkhon", "Wadanang", "Walpana"],
    Nongpoh: ["Diwon", "Jongsha", "Mawdiangum", "Nongtynger", "Umran"],
    Jowai: [
      "Chutwakhu",
      "Iawmusiang",
      "Ladthadlaboh",
      "Mission Compound",
      "Nartiang",
    ],
    Nongstoin: ["Domkseh", "Ksehkohlong", "Mawduh", "Nongspung", "Pyndengrei"],
  },
  Mizoram: {
    Aizawl: ["Bara Bazar", "Chaltlang", "Dawrpui", "Kulikawn", "Ramhlun"],
    Lunglei: ["Bualpui", "Hauruang", "Lunglawn", "Mualthuam", "Zobawk"],
    Saiha: ["Chhimluang", "Chhuarlung", "Kawlphei", "Saihatlangkawn", "Tuisih"],
    Champhai: ["Bungzung", "Chhawrtui", "Kanan", "Kawnpui", "Zotlang"],
    Serchhip: [
      "Chhingchhip",
      "E.Phaileng",
      "Keitum",
      "N.Vanlaiphai",
      "Thenzawl",
    ],
  },
  Nagaland: {
    Kohima: ["AG Colony", "High School", "Lerie", "Meriema", "Parade Road"],
    Dimapur: [
      "Chumukedima",
      "Duncan Basti",
      "Khermahal",
      "Nagarjan",
      "Zeliangrong",
    ],
    Mokokchung: ["Aongza", "Alongmen Ward", "Dilong", "Limpong", "Salangtem"],
    Tuensang: [
      "Chingmelen",
      "Hakushang",
      "Longkhim",
      "Sangsomong",
      "Tuensang Town",
    ],
    Wokha: ["Chukitong", "Longsa", "Niroyo", "Ralan", "Wokha Town"],
  },
  Odisha: {
    Bhubaneswar: [
      "Chandrasekharpur",
      "Jaydev Vihar",
      "Khandagiri",
      "Patia",
      "Saheed Nagar",
    ],
    Cuttack: [
      "Bajrakabati Road",
      "Chauliaganj",
      "College Square",
      "Madhupatna",
      "Naya Bazar",
    ],
    Rourkela: [
      "Basanti Colony",
      "Chhend Colony",
      "Jhirpani",
      "Koel Nagar",
      "Panposh",
    ],
    Sambalpur: ["Ainthapali", "Budharaja", "Dhanupali", "Modipara", "Remed"],
    Berhampur: [
      "Aska Road",
      "Bada Bazaar",
      "Brahmapur",
      "Gandhinagar",
      "Gopalpur",
    ],
  },
  Punjab: {
    Chandigarh: [
      "Sector 10",
      "Sector 20",
      "Sector 30",
      "Sector 40",
      "Sector 50",
    ],
    Ludhiana: [
      "BRS Nagar",
      "Model Town",
      "Pakhowal Road",
      "Sarabha Nagar",
      "SBS Nagar",
    ],
    Amritsar: [
      "Green Avenue",
      "Mall Road",
      "Ranjit Avenue",
      "Putlighar",
      "Sultanwind Road",
    ],
    Jalandhar: [
      "Adarsh Nagar",
      "GTB Nagar",
      "Model Town",
      "Nehru Garden",
      "Urban Estate",
    ],
    Patiala: [
      "Baradari",
      "Bhadson Road",
      "Leela Bhawan",
      "Model Town",
      "Rajpura Road",
    ],
  },
  Rajasthan: {
    Jaipur: [
      "Bani Park",
      "C-Scheme",
      "Malviya Nagar",
      "Mansarovar",
      "Vaishali Nagar",
    ],
    Jodhpur: ["Basni", "Mandore", "Paota", "Ratanada", "Shastri Nagar"],
    Udaipur: [
      "Bapu Bazar",
      "Fatehpura",
      "Hiran Magri",
      "Sector 3",
      "Shastri Circle",
    ],
    Kota: [
      "Dhanmandi",
      "Gumanpura",
      "Jawahar Nagar",
      "Talwandi",
      "Vigyan Nagar",
    ],
    Bikaner: [
      "Gajner Road",
      "Junagarh",
      "Nal Road",
      "Rani Bazar",
      "Station Road",
    ],
  },
  Sikkim: {
    Gangtok: ["Chandmari", "Deorali", "M.G. Marg", "Ranka", "Tadong"],
    Namchi: ["Boomtar", "Doren", "Kamrang", "Kewzing", "Namchi Bazar"],
    Geyzing: ["Arithang", "Chumbung", "Khecheopalri", "Legship", "Yangthang"],
    Mangan: ["Dzongu", "Lower Dzongu", "Mallang", "Nampatam", "Rongong"],
    Rangpo: ["Mamring", "Pakyong", "Rongli", "Singtam", "Tirikhola"],
  },
  "Tamil Nadu": {
    Chennai: ["Adyar", "Anna Nagar", "Mylapore", "Tambaram", "T. Nagar"],
    Coimbatore: [
      "Gandhipuram",
      "Peelamedu",
      "R.S. Puram",
      "Saibaba Colony",
      "Singanallur",
    ],
    Madurai: [
      "Anna Nagar",
      "K.K. Nagar",
      "Mellur",
      "S.S. Colony",
      "Tallakulam",
    ],
    Tiruchirappalli: [
      "Anna Nagar",
      "Cantonment",
      "KK Nagar",
      "Srirangam",
      "Thillai Nagar",
    ],
    Salem: [
      "Alagapuram",
      "Fairlands",
      "Hasthampatti",
      "Seelanaickenpatti",
      "Suramangalam",
    ],
  },
  Telangana: {
    Hyderabad: [
      "Banjara Hills",
      "Gachibowli",
      "Kukatpally",
      "Madhapur",
      "Secunderabad",
    ],
    Warangal: [
      "Hanamkonda",
      "Kazipet",
      "LB Nagar",
      "Shyampet",
      "Warangal Fort Road",
    ],
    Nizamabad: [
      "Bodhan",
      "Dichpally",
      "Gangastan",
      "Indalwai",
      "Vinayak Nagar",
    ],
    Khammam: [
      "Church Road",
      "Gandhi Chowk",
      "Mamillagudaem",
      "Wyra Road",
      "Z.P. Centre",
    ],
    Karimnagar: [
      "Jagtial Road",
      "Kothirampur",
      "Mancherial",
      "Peddapalli",
      "Sircilla",
    ],
  },
  Tripura: {
    Agartala: [
      "Banamalipur",
      "Dhaleswar",
      "Indranagar",
      "Krishnanagar",
      "Narsingarh",
    ],
    Dharmanagar: [
      "College Road",
      "Netaji Nagar",
      "North Ramnagar",
      "South Charilam",
      "Subhash Road",
    ],
    Udaipur: [
      "Matabari",
      "Milan Chakra",
      "Palace Compound",
      "Rajbari",
      "Shibnagar",
    ],
    Kailasahar: [
      "Bagbassa",
      "Chandrapur",
      "Gandacherra",
      "Kailashahar",
      "Radhakishorepur",
    ],
    Belonia: ["Bishalgarh", "Gakulnagar", "Khowai", "Santirbazar"],
  },
  "Uttar Pradesh": {
    Lucknow: [
      "Aliganj",
      "Gomti Nagar",
      "Indira Nagar",
      "Jankipuram",
      "Vikas Nagar",
    ],
    Kanpur: [
      "Civil Lines",
      "Kakadeo",
      "Lajpat Nagar",
      "Shyam Nagar",
      "Swaroop Nagar",
    ],
    Ghaziabad: [
      "Crossing Republik",
      "Indirapuram",
      "Raj Nagar Extension",
      "Vaishali",
      "Vasundhara",
    ],
    Agra: [
      "Dayal Bagh",
      "Fatehabad Road",
      "Kamla Nagar",
      "Sadar Bazar",
      "Sanjay Place",
    ],
    Varanasi: ["Bhelupur", "Lanka", "Mahmoorganj", "Sigra", "Sunderpur"],
  },
  Uttarakhand: {
    Dehradun: [
      "Clement Town",
      "Dalanwala",
      "Rajpur Road",
      "Saharanpur Road",
      "Vasant Vihar",
    ],
    Haridwar: [
      "Bhoopatwala",
      "Jwalapur",
      "Mayapur",
      "Shivalik Nagar",
      "SIDCUL",
    ],
    Roorkee: [
      "Civil Lines",
      "Ganj",
      "Jawahar Nagar",
      "Shivpuri",
      "Thapar Nagar",
    ],
    Haldwani: [
      "Durga City Center",
      "Kusumkhera",
      "Mukhani",
      "Nainital Road",
      "Rampur Road",
    ],
    Nainital: ["Ayarpatta", "Mallital", "Mukteshwar", "Ramgarh", "Tallital"],
  },
  "West Bengal": {
    Kolkata: ["Alipore", "Ballygunge", "Behala", "Dum Dum", "Salt Lake City"],
    Howrah: ["Bally", "Belur", "Liluah", "Shibpur", "Shyampur"],
    Durgapur: ["Benachity", "City Centre", "Fuljhore", "Sagarbhanga", "SAIL"],
    Asansol: ["Bapuji Nagar", "Burnpur", "Hutton Road", "Jagacha", "Kulti"],
    Siliguri: [
      "Hill Cart Road",
      "Matigara",
      "Sevoke Road",
      "Shiv Mandir",
      "Sukna",
    ],
  },
  "Andaman and Nicobar Islands": {
    "Port Blair": [
      "Aberdeen Bazaar",
      "Bamboo Flat",
      "Haddo",
      "Port Blair Rural",
      "Sippighat",
    ],
  },
  Chandigarh: {
    Chandigarh: [
      "Sector 10",
      "Sector 20",
      "Sector 30",
      "Sector 40",
      "Sector 50",
    ],
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    Daman: ["Devka Beach", "Kadaiya", "Nani Daman", "Moti Daman", "Somnath"],
    Diu: ["Diu Fort", "Fudam", "Nagoa Beach", "Vanakbara", "Zampa Gateway"],
    Silvassa: ["Amli", "Dadra", "Naroli", "Rakholi", "Samarvarni"],
  },
  Lakshadweep: {
    Kavaratti: ["Andrott", "Kavaratti Town", "Kalpeni", "Minicoy", "Pitti"],
  },
  Delhi: {
    "New Delhi": [
      "Chanakyapuri",
      "Connaught Place",
      "Daryaganj",
      "Karol Bagh",
      "Paharganj",
    ],
  },
  Puducherry: {
    Puducherry: [
      "Ariyankuppam",
      "Kurumbapet",
      "Muthialpet",
      "Nellithope",
      "Orleanpet",
    ],
    Karaikal: [
      "Karaikal Beach",
      "Karaikal Port",
      "Karaikal Town",
      "Nagapattinam",
      "Thirunallar",
    ],
    Mahe: ["Chalakara", "Chandragiri", "Palloor", "Puthalam", "Thalassery"],
    Yanam: ["Alaganallur", "Attili", "Kotipalli", "Mallipudi", "Perakam"],
  },
  Ladakh: {
    Leh: ["Choglamsar", "Karu", "Leh Market", "Spituk", "Thiksey"],
    Kargil: ["Batalik", "Dras", "Goma Kargil", "Khurba Kargil", "Sankoo"],
  },
  "Jammu and Kashmir": {
    Srinagar: ["Bemina", "Dargah", "Hazratbal", "Mughal Gardens", "Nishat"],
    Jammu: [
      "Bakshi Nagar",
      "Gandhi Nagar",
      "Janipur",
      "Talab Tillo",
      "Trilokpur",
    ],
  },
};

function PostProperty() {
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    state: "",
    city: "",
    localArea: "",
    bedrooms: "",
    bathrooms: "",
    bachelorsAllowed: false,
    nearbyRailwayStationDistance: "",
    nearbyHospitalDistance: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = (formData) => {
    const newErrors = {};

    if (!formData.propertyType) {
      newErrors.propertyType = "Property type is required.";
    }

    if (!formData.title) {
      newErrors.title = "Title is required.";
    }

    if (!formData.state) {
      newErrors.state = "State is required.";
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
    }

    if (!formData.localArea) {
      newErrors.localArea = "Local Area is required.";
    }

    if (!formData.bedrooms) {
      newErrors.bedrooms = "Number of bedrooms is required.";
    } else if (isNaN(formData.bedrooms)) {
      newErrors.bedrooms = "Number of bedrooms must be a number.";
    }

    if (!formData.bathrooms) {
      newErrors.bathrooms = "Number of bathrooms is required.";
    } else if (isNaN(formData.bathrooms)) {
      newErrors.bathrooms = "Number of bathrooms must be a number.";
    }

    if (!formData.nearbyRailwayStationDistance) {
      newErrors.nearbyRailwayStationDistance =
        "Nearby railway station's distance is required.";
    } else if (isNaN(formData.nearbyRailwayStationDistance)) {
      newErrors.nearbyRailwayStationDistance =
        "Nearby railway station's distance must be a number.";
    }

    if (!formData.nearbyHospitalDistance) {
      newErrors.nearbyHospitalDistance =
        "Nearby hospital's distance is required.";
    } else if (isNaN(formData.nearbyHospitalDistance)) {
      newErrors.nearbyHospitalDistance =
        "Nearby hospital's distance must be a number.";
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(formData.price)) {
      newErrors.price = "Price must be a number.";
    }

    return newErrors;
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      city: "",
      localArea: "",
    });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({
      ...formData,
      city: selectedCity,
      localArea: "",
    });
  };

  const handleLocalAreaChange = (e) => {
    const selectedLocalArea = e.target.value;
    setFormData({
      ...formData,
      localArea: selectedLocalArea,
    });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});

      try {
        const response = await axios.post(
          "/api/v1/properties/post-property",
          formData,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          alert(
            "Property added successfully! Redirecting you to My Properties page."
          );
          setTimeout(() => {
            navigate("/my-properties");
          }, 1000);
        } else {
          setErrors({ apiError: response.data.message });
        }
      } catch (error) {
        console.error("Error adding property:", error);
        setErrors({
          apiError:
            error.response?.data?.message ||
            "An error occurred while adding the property.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Post Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.propertyType ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Select Property Type"
            >
              <option value="">Select Property Type</option>
              <option value="1bhk">1 BHK</option>
              <option value="2bhk">2 BHK</option>
              <option value="3bhk">3 BHK</option>
              <option value="pg">PG</option>
              <option value="house">House</option>
              <option value="room">Room</option>
            </select>
            {errors.propertyType && (
              <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              className={`w-full p-2 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Select State"
            >
              <option value="">Select State</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              className={`w-full p-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded`}
              disabled={!formData.state}
              placeholder="Select City"
            >
              <option value="">Select City</option>
              {formData.state &&
                Object.keys(statesAndCities[formData.state]).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Local Area</label>
            <select
              name="localArea"
              value={formData.localArea}
              onChange={handleLocalAreaChange}
              className={`w-full p-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded`}
              disabled={!formData.city}
              placeholder="Select Local Area"
            >
              <option value="">Select Local Area</option>
              {formData.city &&
                statesAndCities[formData.state][formData.city].map(
                  (localArea) => (
                    <option key={localArea} value={localArea}>
                      {localArea}
                    </option>
                  )
                )}
            </select>
            {errors.localArea && (
              <p className="text-red-500 text-sm mt-1">{errors.localArea}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bedrooms</label>
            <input
              type="text"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.bedrooms ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter Number of Bedrooms (e.g., 2)"
            />
            {errors.bedrooms && (
              <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bathrooms</label>
            <input
              type="text"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.bathrooms ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter Number of Bathrooms (e.g., 1.5)"
            />
            {errors.bathrooms && (
              <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bachelors Allowed</label>
            <input
              type="checkbox"
              name="bachelorsAllowed"
              checked={formData.bachelorsAllowed}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Distance to Nearby Railway Station (in KM)
            </label>
            <input
              type="text"
              name="nearbyRailwayStationDistance"
              value={formData.nearbyRailwayStationDistance}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.nearbyRailwayStationDistance
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
              placeholder="Enter Distance (e.g., 1.5)"
            />
            {errors.nearbyRailwayStationDistance && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nearbyRailwayStationDistance}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Distance to Nearby Hospital (in KM)
            </label>
            <input
              type="text"
              name="nearbyHospitalDistance"
              value={formData.nearbyHospitalDistance}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.nearbyHospitalDistance
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded`}
              placeholder="Enter Distance (e.g., 0.5)"
            />
            {errors.nearbyHospitalDistance && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nearbyHospitalDistance}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full p-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded`}
              placeholder="Enter Price (e.g., 1000)"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>

          {errors.apiError && (
            <p className="text-red-500 text-sm mt-1">{errors.apiError}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostProperty;
