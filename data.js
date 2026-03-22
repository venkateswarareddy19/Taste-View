/* ============================================================
   TASTE & VIEW v2 — data.js  (Security-hardened)
   Changes from original:
   - buildCard() uses textContent / escapeHTML — no raw innerHTML for user data
   - Storage helper restricted to safe keys (no passwords, no user PII)
   - Favorites stored under allowlisted key only
   - All phone href values validated before use
   - Modal injection uses textContent for dynamic fields
   ============================================================ */

const APP_DATA = {
  cities: {
    Ongole: {
      places: [
        {id:'og1',  name:'Hotel Paradise',                  category:'Restaurant',  cost:150, rating:4.5, phone:'+91 98765 43210', img:'img/paradise.png', description:'Famous biryani & authentic Andhra thali meals', location:'Kurnool Rd,Venkateswara Nagar, Ongole', tags:['Biryani','Meals','Family']},
        {id:'og2',  name:'KB Bar & Restaurant',             category:'Restaurant',  cost:180, rating:4.3, phone:'+91 98765 43211', img:'img/kb-west.avif', description:'Premium non-veg & family dining experience', location:'Kurnool Rd,Near Bus Stand, Ongole', tags:['Non-Veg','Dinner','Premium']},
        {id:'og3',  name:'Bilal Family & Multicuisine Restaurant', category:'Restaurant',  cost:160, rating:4.2, phone:'+91 98765 43212', img:'img/bilal.jpg', description:'Rustic spicy Andhra meals & curries', location:'Addanki Busstand, Ongole', tags:['Spicy','Meals','Dhaba']},
        {id:'og4',  name:'VeGrand Restaurant',              category:'Restaurant',  cost:120, rating:4.1, phone:'+91 98765 43213', img:'img/vgrand.jpg', description:'Pure veg restaurant with classic South Indian menu', location:'Gunter Rd,opp.TDP party office,Gopal nagar, Ongole', tags:['Veg','South Indian','Family']},
        {id:'og5',  name:'BIRYANIS',                        category:'Restaurant',  cost:100, rating:4.0, phone:'+91 98765 43214', img:'img/biryanis.jpg', description:'Budget-friendly veg meals with home taste', location:'Near St.Xaviers church, closer to sujatha nagar, ongole', tags:['Budget','Veg','Non-veg','Meals']},
        {id:'og6',  name:'Barkaas Arabic',                  category:'Restaurant',  cost:140, rating:4.2, phone:'+91 98765 43215', img:'img/barkas.jpeg', description:'Delicious meals, curries & special Andhra dishes', location:'Kurnool Rd,Near Bus Stand, Ongole', tags:['Meals','Andhra','Tasty']},
        {id:'og7',  name:'Varmas Multi Cuisine',            category:'Restaurant',  cost:200, rating:4.4, phone:'+91 98765 43216', img:'img/varmas.jpg', description:'Authentic Andhra cuisine with signature ulavacharu rasam', location:'Mangamuru road Beside NAGARJUNA DEGREE COLLEGE, Ongole', tags:['Andhra','Premium','Authentic']},
        {id:'og8',  name:'Ismail Biryani',                  category:'Restaurant',  cost:130, rating:4.4, phone:'+91 98765 43217', img:'img/ismail.avif', description:'Legendary spicy dum biryani since 1985', location:'Old Town, Ongole', tags:['Biryani','Spicy','Famous']},
        {id:'og25', name:'Hotel Vindhu Bhojanam',           category:'Restaurant',  cost:130, rating:4.4, phone:'+91 98765 43217', img:'img/vindu.jpeg', description:'Tasty and Authentic Andhra Food', location:'Old bypass road, beside Reliance, Ongole', tags:['Biryani','Spicy','Famous']},
        {id:'og26', name:'99 Mandi Ongole',                 category:'Restaurant',  cost:130, rating:4.4, phone:'+91 98765 43217', img:'img/99.jpeg', description:'Biryanis and different types of special mandis with super tasty', location:'Mangamuru road, pandaripuram, Ongole', tags:['Biryani','Spicy','Famous']},
        {id:'og27', name:'Forest The Arabian Mandi',        category:'Restaurant',  cost:130, rating:4.4, phone:'+91 98765 43217', img:'img/forest.jpeg', description:'Biryanis and different types of special mandis with super tasty', location:'Mangamuru road, pandaripuram, Ongole', tags:['Biryani','Spicy','Famous']},
        {id:'og28', name:'Varma Grand Family Restaurant',   category:'Restaurant',  cost:200, rating:4.4, phone:'+91 98765 43216', img:'img/varma.jpeg', description:'Authentic Andhra cuisine with signature ulavacharu rasam', location:'Mangamuru road Beside NAGARJUNA DEGREE COLLEGE, Ongole', tags:['Andhra','Premium','Authentic']},
        {id:'og9',  name:'Bismillah Shawarma',    category:'Street Food', cost:80,  rating:4.3, phone:'+91 98765 43218', img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', description:'Crispy chicken shawarma & rolls — street favorite', location:'MG Road, Ongole', tags:['Shawarma','Chicken','Quick']},
        {id:'og10', name:'Sai Chat Bhandar',      category:'Street Food', cost:60,  rating:4.2, phone:'+91 98765 43219', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80', description:'Pani puri, bhel puri & all chaat varieties', location:'Market Area, Ongole', tags:['Chaat','Pani Puri','Snacks']},
        {id:'og11', name:'Annapurna Tiffins',     category:'Street Food', cost:50,  rating:4.1, phone:'+91 98765 43220', img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80', description:'Morning tiffins — idli, dosa & medu vada', location:'Kurnool Road, Ongole', tags:['Breakfast','Idli','Dosa']},
        {id:'og12', name:'Lassi Corner Ongole',   category:'Street Food', cost:70,  rating:4.0, phone:'+91 98765 43221', img:'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500&q=80', description:'Thick creamy lassi & cold beverages', location:'Near RTC Bus Stand', tags:['Drinks','Lassi','Refreshing']},
        {id:'og13', name:'Cafe Corner',                category:'Cafe', cost:20, rating:4.7, phone:'+91 98765 43222', img:'img/cafecorner.jpeg', description:'Artisan coffee, burgers and chill ambiance', location:'Sri harshini degree college,opp south bypass, gandhi nagar, Ongole', tags:['Coffee','Burgers','Chill']},
        {id:'og14', name:'The Coffee Bar',             category:'Cafe', cost:30, rating:4.4, phone:'+91 98765 43223', img:'img/coffebar.jpeg', description:'Premium coffee experience, relaxing ambiance', location:'Siva prasad colony, Ongole', tags:['Desserts','coffee','tea']},
        {id:'og15', name:'Kumbakonam Premium Coffee',  category:'Cafe', cost:30, rating:4.6, phone:'+91 98765 43224', img:'img/kumbakonam.jpeg', description:'Classic café with coffees, scoops N shakes & good WiFi', location:'Mangamuru Road,Near Andhra bank, Ongole', tags:['Coffee','WiFi','Scoops','shakes']},
        {id:'og29', name:'Cappuccino Cafe',            category:'Cafe', cost:30, rating:4.5, phone:'+91 98765 43223', img:'img/cappuccino.jpeg', description:'Premium coffee experience, relaxing ambiance', location:'Mangamuru road,Near SBI Bank,ongole', tags:['Desserts','coffee','tea']},
        {id:'og30', name:'The Fruitify Cafe',          category:'Cafe', cost:30, rating:4.4, phone:'+91 98765 43223', img:'img/fruitify.jpeg', description:'Premium coffee experience, relaxing ambiance', location:'VIP Road,Lawyer Pet Extension, Ongole', tags:['Desserts','coffee','tea']},
        {id:'og31', name:'Puji Coffee Lounge',         category:'Cafe', cost:30, rating:4.3, phone:'+91 98765 43223', img:'img/coffelounge.jpeg', description:'Premium coffee experience, relaxing ambiance', location:'Beside taluka police station,sujitha nagar, Ongole', tags:['Desserts','coffee','tea']},
        {id:'og16', name:'Kothapatnam Beach', lat:15.6467, lng:80.2915,   category:'Best Place', cost:0, rating:4.7, phone:'+91 98765 43225', img:'img/kotapatnum.jpeg', description:'Golden sands, sea breeze & stunning sunset views', location:'Kothapatnam, Ongole', tags:['Beach','Sunset','Nature']},
        {id:'og17', name:'Mallavaram Dam',      category:'Best Place', cost:0, rating:4.6, phone:'+91 98765 43226', img:'img/mallavaramdam.jpeg', description:'Temple & less-crowded pristine dam views', location:'Venkateswarapuram,Ongole', tags:['Dam','Peaceful','Scenic']},
        {id:'og48', name:'Madanur Beach',       category:'Best Place', cost:0, rating:4.6, phone:'+91 98765 43226', img:'img/mannure.jpeg', description:'Serene & less-crowded pristine beach escape', location:'Ethamukkala,Ongole.', tags:['Beach','Peaceful','Scenic']},
        {id:'og49', name:'Ethamukka Beach',     category:'Best Place', cost:0, rating:4.6, phone:'+91 98765 43226', img:'img/mannur.jpeg', description:'Serene & less-crowded pristine beach escape', location:'Ethamukkala,Ongole.', tags:['Beach','Peaceful','Scenic']},
        {id:'og18', name:'Srigiri Konda', lat:15.4780, lng:80.0521,       category:'Best Place', cost:0, rating:4.5, phone:'+91 98765 43227', img:'img/mountain.jpeg', description:'Scenic mountain & reservoir surrounded by hills', location:'Seetha Ram Puram, Devuni Cheru, Ongole.', tags:['Nature','mountain','Picnic']},
        {id:'og19', name:'Gandhi Park', lat:15.5058, lng:80.0498,         category:'Best Place', cost:0, rating:4.6, phone:'+91 98765 43228', img:'img/gandipark.jpeg', description:'Lush green park ideal for evening walks & relaxation', location:'Anjaya road,Court Center, Ongole', tags:['Park','Walk','Family']},
        {id:'og50', name:'Mamidipalem Cheruvu', category:'Best Place', cost:0, rating:4.6, phone:'+91 98765 43228', img:'img/mamidapalam.jpeg', description:'Lush green park ideal for evening walks & relaxation', location:'Mamidipalem,mm road, Ongole.', tags:['Park','Walk','Family']},
        {id:'og32', name:'Ravi Priya Multiplex',       category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/ravipriyamall.jpeg', description:'Best theatrical experience with Dolby Atmos audio quality.', location:'Guntur Rd, Gopal Nagar, Ongole', tags:['Food','Movie','Family']},
        {id:'og33', name:'Satyam Theatre',             category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/satyam.jpeg', description:'Single Screen Theatre with 4K Experience.', location:'Sixty Feet Rd, Venkateswara Nagar, Ongole.', tags:['Food','Movie','Family']},
        {id:'og34', name:'Sri Saroj Mayuri Theatre',   category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/sri.jpeg', description:'Good sound system and a fairly large screen for the latest films.', location:'Kurnool Rd, Venkateswara Nagar, Ongole.', tags:['Food','Movie','Family']},
        {id:'og35', name:'GOPI Theatre',               category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/gopi.jpeg', description:'Comfy seats and clear sound for a great movie experience.', location:'Gandhi Complex, opp. 1st Lane, Islampet, Gopal Nagar, Ongole.', tags:['Food','Movie','Family']},
        {id:'og36', name:'Krishna Theatre',            category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/krishna.jpeg', description:'Grand theatre with powerful Dolby sound and massive seating.', location:'Gandhi Complex, Islampet-1, Ongole.', tags:['Food','Movie','Family']},
        {id:'og37', name:'Gorantla Cinemas Multiplex', category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/gorentla.jpeg', description:'4 screens with 4K support, huge parking and red & black theme.', location:'Cumbu, Gopal Nagar, Ongole.', tags:['Food','Movie','Family']},
        {id:'og38', name:'Ratna Mahal Movie Theatre',  category:'Theatre', cost:180, rating:4.6, phone:'+91 98765 43228', img:'img/ratnam.jpeg', description:'Good facilities and seating with Dolby Atmos advertisement.', location:'Trunk Road, Bhagyanagar, Ongole.', tags:['Food','Movie','Family']},
        {id:'og20', name:'SriGiri VenkateswaraSwamy Temple', lat:15.4780, lng:80.0521,                   category:'Holy Place', cost:0, rating:4.8, phone:'+91 98765 43229', img:'img/srigiri.jpeg', description:'Like Tirumala, all Lord Venkateswara prayers are offered with utmost devotion.', location:'Seetha Ram Puram, Devuni Cheru, Ongole.', tags:['Temple','Venkateswara swami','Sacred']},
        {id:'og43', name:'Sri Subramanyeswara Swamy Temple',                   category:'Holy Place', cost:0, rating:4.8, phone:'+91 98765 43229', img:'img/srigiri2.jpeg', description:'SriGiri Sri Subramanyeswara Swamy Temple in Ongole.', location:'Seetha Ram Puram, Devuni Cheru, Ongole.', tags:['Temple','Venkateswara swami','Sacred']},
        {id:'og21', name:'Calvary Temple Ongole',                              category:'Holy Place', cost:0, rating:4.7, phone:'+91 98765 43230', img:'img/calvery.jpeg', description:'A beautiful church built for God and those who worship Him.', location:'Chirala - Ongole Rd, Mukthinuthalapadu.', tags:['Temple','Ancient','Christian']},
        {id:'og22', name:'Shri Shiridi Sai Baba Temple', lat:15.5068, lng:80.0467,                       category:'Holy Place', cost:0, rating:4.4, phone:'+91 98765 43231', img:'img/saibaba.jpeg', description:'Popular pilgrimage site dedicated to Sai Baba, peaceful for worship and meditation.', location:'Lawyer Pet, Ongole.', tags:['Sai Baba','Heritage','Peace']},
        {id:'og44', name:'Kanaka Durga Temple',                                category:'Holy Place', cost:0, rating:4.8, phone:'+91 98765 43229', img:'img/kanakadurgaamma.jpeg', description:'Devotees gather every Friday for special prayers. Flowers and coconuts available nearby.', location:'Near BA & KR Degree College, Lawyer Pet, Ongole.', tags:['Temple','Kanaka Durga','Sacred']},
        {id:'og45', name:'Vijayanagara era Shri Prasanna Chennakesava Swamy Temple', category:'Holy Place', cost:0, rating:4.8, phone:'+91 98765 43229', img:'img/chennakasava.jpeg', description:'Ancient temple built by local kings of the Vijayanagar dynasty. Very peaceful and historically significant.', location:'Seetha Ram Puram, Devuni Cheru, Ongole.', tags:['Temple','Chennakesava Swamy','Sacred']},
        {id:'og46', name:'Sri Seetha Ramaswamy Devasthanam',                   category:'Holy Place', cost:0, rating:4.8, phone:'+91 98765 43229', img:'img/sri3.jpeg', description:'Pilgrimage site with special Friday ceremonies. Offerings available outside.', location:'Sitha Rama Puram Rd, Gaddalagunta, Ongole.', tags:['Temple','Seetha Ram','Sacred']},
        {id:'og47', name:'Jewett Memorial Baptist Church (JMBC)',               category:'Holy Place', cost:0, rating:4.7, phone:'+91 98765 43230', img:'img/jmbc.jpeg', description:'Warm and welcoming Christ-centered church with programs for all ages and community outreach.', location:'JMB church centre, Trunk Rd, Gandhi Nagar, Ongole.', tags:['Temple','Ancient','Christian']},
        {id:'og23', name:'Ravi Priya Mall', category:'Mall', cost:0, rating:4.3, phone:'+91 98765 43232', img:'img/ravipriyamall.jpeg', description:'Shopping, movies & food court all in one place', location:'Trunk Road, Ongole', tags:['Shopping','Movies','Food Court']},
        {id:'og24', name:'DMart Ongole',    category:'Mall', cost:0, rating:4.5, phone:'+91 98765 43233', img:'img/dmart.jpeg', description:'Budget supermarket with huge variety & great deals', location:'NH Road, Ongole', tags:['Supermarket','Budget','Groceries']},
      ],
      events: [
        {id:'ev1', name:'Ongole Food Festival',  date:'Mar 15, 2025', phone:'+91 98765 43240', img:'https://i.pinimg.com/1200x/90/7e/7d/907e7d060e7408ed7dcce2c4eab50699.jpg', description:'3-day grand food expo with 50+ stalls', location:'Gandhi Park Ground'},
        {id:'ev2', name:'Cultural Night Andhra', date:'Mar 22, 2025', phone:'+91 98765 43241', img:'https://i.pinimg.com/1200x/ce/24/30/ce2430620f67f32f79ea22f57b5ada85.jpg', description:'Classical Kuchipudi & folk dance performances', location:'Town Hall, Ongole'},
        {id:'ev3', name:'Street Food Expo',      date:'Apr 1, 2025',  phone:'+91 98765 43242', img:'https://i.pinimg.com/1200x/d7/6c/d5/d76cd5a71d3a3abae635155f273d58ac.jpg', description:'Best street foods from across Andhra Pradesh', location:'RTC Grounds, Ongole'},
        {id:'ev4', name:'Music Concert Night',   date:'Apr 8, 2025',  phone:'+91 98765 43243', img:'https://i.pinimg.com/1200x/76/54/e2/7654e2d45cfe8551bba335bebc2d6481.jpg', description:'Live Telugu folk & fusion music performances', location:'Open Air Theatre'},
      ],
      culture: [
        {id:'cu1',  name:'Kuchipudi Dance',          subcat:'Performing Arts',   img:'https://i.pinimg.com/1200x/1b/aa/42/1baa425f5814fbde0521cab728d6f745.jpg', description:'Classical dance form native to Andhra Pradesh, rooted in Hindu mythology and temple traditions', tag:'Traditional Dance', icon:'fa-person-dancing'},
        {id:'cu2',  name:'Kalamkari Art',            subcat:'Traditional Art',   img:'https://i.pinimg.com/736x/24/f7/80/24f780e662e09c96bce6bffcf8a5c69b.jpg', description:'Ancient textile art using natural dyes to paint mythological stories on fabric', tag:'Craft Heritage', icon:'fa-palette'},
        {id:'cu3',  name:'Andhra Handlooms',         subcat:'Traditional Attire',img:'https://i.pinimg.com/1200x/c5/b1/d1/c5b1d18c755e6233cadbf39da9c79c6d.jpg', description:'Famous Venkatagiri sarees & Ongole cotton textiles — symbols of regional fashion', tag:'Traditional Fashion', icon:'fa-shirt'},
        {id:'cu4',  name:'Ugadi Festival',           subcat:'Festival',          img:'https://i.pinimg.com/736x/a6/8c/28/a68c282573eec2fb002603fabf3ce301.jpg', description:"Telugu New Year celebrated with Pachadi — a mix of six tastes symbolizing life's spectrum", tag:'Festival', icon:'fa-star-and-crescent'},
        {id:'cu5',  name:'Gongura Cuisine',          subcat:'Local Food',        img:'https://i.pinimg.com/736x/d5/61/27/d56127a0c70acf8699a95c2996dd32f7.jpg', description:'Sorrel-leaf based dishes — the soul of Andhra cooking; gongura pickle, mutton & chicken curries', tag:'Regional Cuisine', icon:'fa-bowl-food'},
        {id:'cu6',  name:'Brahmotsavam Procession',  subcat:'Sacred Tradition',  img:'https://i.pinimg.com/1200x/7f/08/78/7f087897014af58f4cfd59f399b219cc.jpg', description:'Grand temple procession during Brahmotsavam festival with decorated chariots and music', tag:'Sacred Tradition', icon:'fa-place-of-worship'},
        {id:'cu7',  name:'Ongole Cattle Breed',      subcat:'Heritage',          img:'https://i.pinimg.com/736x/c4/08/fe/c408fe78153100a8af6125774aeede47.jpg', description:'World-renowned Ongole Bull — exported to 70 countries, a pride of Prakasam district', tag:'Regional Heritage', icon:'fa-leaf'},
        {id:'cu8',  name:'Harikatha Performances',   subcat:'Music & Story',     img:'https://i.pinimg.com/736x/08/7a/78/087a78b8c282f23b3419c4064d0dade3.jpg', description:'Ancient storytelling through music, Harikatha narrates epics and devotional tales', tag:'Folk Tradition', icon:'fa-music'},
        {id:'cu9',  name:'Burrakatha Folk Art',      subcat:'Performing Arts',   img:'https://i.pinimg.com/736x/70/bf/8e/70bf8e1d336123f71907bf999fec9e54.jpg', description:'Trio performers narrate stories of heroes and deities using drums and rhythmic verse', tag:'Folk Performance', icon:'fa-drum'},
        {id:'cu10', name:'Intinta Deepavali',        subcat:'Festival',          img:'https://i.pinimg.com/736x/f9/dd/c9/f9ddc92eac0625e469059658401f9b25.jpg', description:'Diwali celebrated with traditional clay diyas, kolam patterns and family sweets', tag:'Festival', icon:'fa-fire-flame-curved'},
        {id:'cu11', name:'Dhoti & Saree Tradition',  subcat:'Traditional Attire',img:'https://i.pinimg.com/1200x/66/cb/1d/66cb1d1a55d43f3702d563addc11ab4f.jpg', description:'Men in white dhotis and women draped in vibrant Andhra cotton sarees at festivals and temples', tag:'Traditional Attire', icon:'fa-shirt'},
        {id:'cu12', name:'Pesarattu & Attu',         subcat:'Local Food',        img:'https://i.pinimg.com/736x/86/87/16/8687164d92e8cddb181091a31100fbca.jpg', description:'Green moong dal crepes unique to Andhra breakfast culture, served with ginger chutney', tag:'Breakfast Heritage', icon:'fa-utensils'},
      ]
    },
    Guntur: {
      places: [
        {id:'gn1', name:'Guntur Spice House',  category:'Restaurant',  cost:170, rating:4.6, phone:'+91 98765 50001', img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80', description:'Famous for spicy Guntur chicken curry', location:'RTC Road, Guntur', tags:['Spicy','Chicken','Famous']},
        {id:'gn2', name:'Amaravati Dhaba',     category:'Restaurant',  cost:140, rating:4.3, phone:'+91 98765 50002', img:'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&q=80', description:'Traditional Andhra thali & curries', location:'Arundelpet, Guntur', tags:['Thali','Andhra','Budget']},
        {id:'gn3', name:'Chili Street Stall',  category:'Street Food', cost:50,  rating:4.4, phone:'+91 98765 50003', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80', description:'Guntur mirchi bajji — the hottest in Andhra', location:'Market Road, Guntur', tags:['Mirchi','Spicy','Street']},
        {id:'gn4', name:'Nagarjuna Park',      category:'Best Place',  cost:20,  rating:4.5, phone:'+91 98765 50004', img:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80', description:'Beautiful park with walking tracks & fountain', location:'Guntur City', tags:['Park','Walk','Family']},
        {id:'gn5', name:'Amaravati Temple', lat:16.5752, lng:80.3584,    category:'Holy Place',  cost:0,   rating:4.9, phone:'+91 98765 50005', img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80', description:'Ancient Buddhist stupa and Amaralingeswara temple', location:'Amaravati, Guntur', tags:['Temple','Buddhist','Heritage']},
        {id:'gn6', name:'Brodipet Mall',       category:'Mall',        cost:0,   rating:4.2, phone:'+91 98765 50006', img:'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80', description:'Popular mall with cinema & shopping', location:'Brodipet, Guntur', tags:['Shopping','Cinema','Food']},
      ],
      events: [{id:'gev1', name:'Guntur Chili Festival', date:'Mar 20, 2025', phone:'+91 98765 50010', img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80', description:'World-famous chili expo & spice competition', location:'Exhibition Grounds, Guntur'}],
      culture: [
        {id:'gcu1', name:'Guntur Mirchi Heritage', subcat:'Regional Food',    img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80', description:"Guntur is the chili capital of India — supplying 60% of India's red chili production", tag:'Food Heritage', icon:'fa-fire-flame-curved'},
        {id:'gcu2', name:'Kondapalli Toys',        subcat:'Traditional Craft', img:'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=500&q=80', description:'Brightly painted wooden toys from Kondapalli village — a GI-tagged craft form', tag:'Traditional Craft', icon:'fa-palette'},
      ]
    },
    Vijayawada: {
      places: [
        {id:'vj1', name:'Babai Hotel',        category:'Restaurant', cost:200, rating:4.7, phone:'+91 98765 60001', img:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80', description:'Iconic Vijayawada dining since 1970s', location:'MG Road, Vijayawada', tags:['Iconic','Historic','Andhra']},
        {id:'vj2', name:'Prakasam Barrage', lat:16.5145, lng:80.5961,   category:'Best Place', cost:0,   rating:4.8, phone:'+91 98765 60002', img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80', description:'Iconic barrage across Krishna River — stunning views', location:'Krishna Riverbank', tags:['Barrage','River','Views']},
        {id:'vj3', name:'Kanaka Durga Temple', lat:16.5172, lng:80.6048,category:'Holy Place', cost:0,   rating:4.9, phone:'+91 98765 60003', img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80', description:'Most sacred temple atop Indrakeeladri hill', location:'Indrakeeladri Hill, VJW', tags:['Temple','Sacred','Hilltop']},
        {id:'vj4', name:'Bandar Bajji Shop',  category:'Street Food',cost:40,  rating:4.4, phone:'+91 98765 60004', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80', description:'Crispy mirchi & onion bajjis — legendary street food', location:'Bandar Road, VJW', tags:['Bajji','Street','Famous']},
        {id:'vj5', name:'Eswar Mall',         category:'Mall',       cost:0,   rating:4.3, phone:'+91 98765 60005', img:'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80', description:'Premium mall with cinema & entertainment zone', location:'Eluru Road, VJW', tags:['Premium','Cinema','Entertainment']},
      ],
      events: [{id:'vjev1', name:'Vijayawada Dasara', date:'Oct 2, 2025', phone:'+91 98765 60010', img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80', description:'Grand Dasara celebrations at Kanaka Durga Temple', location:'Indrakeeladri Hill'}],
      culture: [
        {id:'vjcu1', name:'Kanaka Durga Brahmotsavam', subcat:'Sacred Festival', img:'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=500&q=80', description:'9-day grand festival at Kanaka Durga Temple with lakhs of devotees', tag:'Sacred Festival', icon:'fa-place-of-worship'},
        {id:'vjcu2', name:'Vijayawada Pesalu',         subcat:'Regional Food',   img:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80', description:'Heritage moong dal breakfast recipes unique to this Krishna delta region', tag:'Food Tradition', icon:'fa-bowl-food'},
      ]
    },
    Vizag: {
      places: [
        {id:'vz1', name:'Beach Road Diner',  category:'Restaurant', cost:250, rating:4.6, phone:'+91 98765 70001', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', description:'Fine dining with panoramic Bay of Bengal views', location:'Beach Road, Vizag', tags:['Seafood','Views','Fine Dining']},
        {id:'vz2', name:'Rushikonda Beach', lat:17.7838, lng:83.3842,  category:'Best Place', cost:0,   rating:4.8, phone:'+91 98765 70002', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80', description:'Premier beach with watersports & golden sands', location:'Rushikonda, Vizag', tags:['Beach','Watersports','Scenic']},
        {id:'vz3', name:'Simhachalam Temple', lat:17.7692, lng:83.2745,category:'Holy Place', cost:0,   rating:4.9, phone:'+91 98765 70003', img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80', description:'Sacred Narasimha temple with exquisite architecture', location:'Simhachalam Hill, Vizag', tags:['Temple','Sacred','Ancient']},
        {id:'vz4', name:'RK Beach Chaat',   category:'Street Food',cost:60,  rating:4.3, phone:'+91 98765 70004', img:'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80', description:'Classic beach-side chaat & bhel on RK Beach', location:'RK Beach, Vizag', tags:['Chaat','Beach','Evening']},
        {id:'vz5', name:'CMR Central Vizag',category:'Mall',        cost:0,   rating:4.4, phone:'+91 98765 70005', img:'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80', description:'Largest mall in Vizag with 100+ brands', location:'Siripuram, Vizag', tags:['Biggest','Brands','Cinema']},
      ],
      events: [{id:'vzev1', name:'Beach Music Festival', date:'Apr 15, 2025', phone:'+91 98765 70010', img:'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&q=80', description:'Annual music festival on Vizag beach strip', location:'RK Beach, Vizag'}],
      culture: [
        {id:'vzcu1', name:'Araku Valley Tribes', subcat:'Tribal Heritage', img:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&q=80', description:'Tribal communities of Araku Valley preserve ancient weaving, dance and musical traditions', tag:'Tribal Heritage', icon:'fa-drum'},
        {id:'vzcu2', name:'VUDA Kuchipudi Show',subcat:'Performing Arts',  img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80', description:'Regular classical dance performances organized at Beach Road cultural hub', tag:'Classical Dance', icon:'fa-person-dancing'},
      ]
    },
    Tirupati: {
      places: [
        {id:'tp1', name:'Tirupati Laddu Shop',    category:'Street Food', cost:50,  rating:5.0, phone:'+91 98765 80001', img:'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&q=80', description:'The world-famous Tirupati prasadam laddu', location:'Temple Premises', tags:['Laddu','Sacred','Famous']},
        {id:'tp2', name:'Sri Venkateswara Temple', lat:13.6834, lng:79.3473,category:'Holy Place',  cost:0,   rating:5.0, phone:'+91 98765 80002', img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&q=80', description:'Most visited holy temple in the world', location:'Tirumala Hills', tags:['Temple','Sacred','Divine']},
        {id:'tp3', name:'Akasaganga Teertham', lat:13.6952, lng:79.3567,    category:'Best Place',  cost:0,   rating:4.7, phone:'+91 98765 80003', img:'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80', description:'Sacred waterfall on Tirumala hills', location:'Tirumala, Tirupati', tags:['Waterfall','Sacred','Nature']},
        {id:'tp4', name:'Bhimas Restaurant',      category:'Restaurant',  cost:180, rating:4.5, phone:'+91 98765 80004', img:'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500&q=80', description:'Famous veg restaurant serving pilgrims since decades', location:'Tirupati Town', tags:['Veg','Famous','Pilgrims']},
        {id:'tp5', name:'ISKCON Tirupati',        category:'Holy Place',  cost:0,   rating:4.8, phone:'+91 98765 80005', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', description:'Beautiful ISKCON temple with prasad distribution', location:'Tirupati City', tags:['Temple','ISKCON','Peaceful']},
      ],
      events: [{id:'tpev1', name:'Brahmotsavam Festival', date:'Sep 28, 2025', phone:'+91 98765 80010', img:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80', description:'Grand 9-day annual festival at Tirumala Temple', location:'Tirumala Temple'}],
      culture: [
        {id:'tpcu1', name:'Tirumala Prasadam',       subcat:'Sacred Food', img:'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500&q=80', description:'The divine Tirupati laddu — a GI-tagged sacred sweet offered to 100,000+ devotees daily', tag:'Sacred Offering', icon:'fa-bowl-food'},
        {id:'tpcu2', name:'Vedic Chanting Tradition', subcat:'Sacred Arts', img:'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=500&q=80', description:'Centuries-old Vedic recitations maintained by temple priests at Tirumala', tag:'Sacred Tradition', icon:'fa-om'},
      ]
    }
  }
};

/* ══════════════════════════════
   SECURE STORAGE HELPER
   Allowlisted keys only — no passwords, no PII
══════════════════════════════ */
const Storage = {
  _allowed: new Set(['tv_favorites', 'tv_city', 'tv_consent']),
  get(key, fallback = null) {
    if (!this._allowed.has(key)) return fallback;
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, val) {
    if (!this._allowed.has(key)) { console.warn(`[Security] Blocked localStorage write: ${key}`); return false; }
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch { return false; }
  },
  remove(key) { if (!this._allowed.has(key)) return false; localStorage.removeItem(key); return true; }
};

/* ══════════════════════════════
   HTML ESCAPE UTILITY
   Must be used for ALL user-supplied / data-driven text injected into innerHTML
══════════════════════════════ */
function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* Validate phone numbers — only tel: links with digits/spaces/+ */
function safePhone(phone) {
  if (!phone) return null;
  const cleaned = String(phone).replace(/\s/g, '');
  return /^\+?[\d]{7,15}$/.test(cleaned) ? cleaned : null;
}

/* ══════════════════════════════
   FAVORITES
══════════════════════════════ */
function getFavorites()       { return Storage.get('tv_favorites', []); }
function toggleFavorite(id) {
  let f = getFavorites();
  const had = f.includes(id);
  f = had ? f.filter(x => x !== id) : [...f, id];
  Storage.set('tv_favorites', f);
  return !had;
}
function isFavorite(id)       { return getFavorites().includes(id); }
function updateFavBadge() {
  const el = document.getElementById('favBadge');
  if (el) { const n = getFavorites().length; el.textContent = n || ''; el.style.display = n ? 'flex' : 'none'; }
}

/* Session: read-only display data from server — no passwords stored */
function getLoggedInUser() {
  // In the hardened version, user data comes from /api/auth/me (server-side session).
  // This stub returns null until backend is wired up.
  // Replace with: return window._sessionUser || null;
  return null;
}

/* ══════════════════════════════
   CATEGORY ICON
══════════════════════════════ */
function getCategoryIcon(cat) {
  const m = {
    'Restaurant':'fa-utensils','Street Food':'fa-bowl-food','Cafe':'fa-mug-hot',
    'Best Place':'fa-mountain-sun','Holy Place':'fa-place-of-worship','Mall':'fa-store',
    'Theatre':'fa-film','Shopping malls':'fa-bag-shopping','Schools & colleges':'fa-graduation-cap',
    'Culture':'fa-masks-theater','Event':'fa-calendar-star'
  };
  return m[cat] || 'fa-star';
}

/* ══════════════════════════════
   TOAST
══════════════════════════════ */
function showToast(msg) {
  let t = document.getElementById('gToast');
  if (!t) { t = document.createElement('div'); t.id = 'gToast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = escapeHTML(msg);  // textContent — safe
  t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ══════════════════════════════
   SECURE CARD BUILDER
   All dynamic fields escaped before insertion into innerHTML.
   Descriptions use textContent via DOM manipulation after insertion.
══════════════════════════════ */
function buildCard(item) {
  const fav = isFavorite(item.id);
  const safeId  = escapeHTML(item.id);
  const safeCat = escapeHTML(item.category || '');
  const safeName= escapeHTML(item.name || '');
  const safeImg = escapeHTML(item.img || '');
  const safeAlt = escapeHTML(item.name || '');
  const safeCost= item.cost > 0 ? `₹${escapeHTML(String(item.cost))}/avg` : 'FREE';
  const safeRating = escapeHTML(String(item.rating || ''));
  const icon    = getCategoryIcon(item.category);

  // Build HTML with escaped values
  const html = `
  <div class="card" data-id="${safeId}">
    <div class="card-img-wrap">
      <img src="${safeImg}" alt="${safeAlt}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'">
      <span class="card-badge"><i class="fa-solid ${icon}"></i> ${safeCat}</span>
      <span class="card-rating"><i class="fa-solid fa-star" style="font-size:.65rem;color:#FFB300"></i> ${safeRating}</span>
      <span class="card-cost ${item.cost === 0 ? 'free' : ''}">${safeCost}</span>
    </div>
    <div class="card-body">
      <h3 class="card-name-el"></h3>
      <p class="card-desc-el"></p>
    </div>
    <div class="card-actions">
      <button class="btn-view" onclick="openModal('${safeId}')"><i class="fa-solid fa-eye"></i> View Details</button>
      <button class="btn-fav ${fav ? 'active' : ''}" onclick="handleFav(this,'${safeId}')" title="Save">
        <i class="fa-${fav ? 'solid' : 'regular'} fa-bookmark"></i>
      </button>
    </div>
  </div>`;

  // After building, use a temp div to set textContent on name/desc
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelector('.card-name-el').textContent = item.name || '';
  tmp.querySelector('.card-desc-el').textContent = item.description || '';
  return tmp.innerHTML;
}

function handleFav(btn, id) {
  const added = toggleFavorite(id);
  btn.classList.toggle('active', added);
  btn.querySelector('i').className = added ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
  showToast(added ? 'Saved to favorites!' : 'Removed from favorites');
  updateFavBadge();
}

/* ══════════════════════════════
   MODAL DATA & SECURE INJECTION
   Uses textContent / setAttribute for all dynamic values
══════════════════════════════ */
let _modalItems = [];
function setModalData(items) { _modalItems = items; }

function openModal(id) {
  const item = _modalItems.find(i => i.id === id);
  if (!item) return;
  const ov = document.getElementById('detailModal');
  if (!ov) return;

  // Use textContent and setAttribute — never innerHTML for item data
  ov.querySelector('#mImg').src = item.img || '';
  ov.querySelector('#mImg').alt = item.name || '';
  ov.querySelector('#mCat').textContent = item.category || '';
  ov.querySelector('#mCat').prepend(Object.assign(document.createElement('i'), { className: `fa-solid ${getCategoryIcon(item.category)} mr-1` }));
  ov.querySelector('#mName').textContent = item.name || '';
  const costEl = ov.querySelector('#mCost');
  costEl.textContent = item.cost > 0 ? `₹${item.cost} avg/person` : 'FREE Entry';
  costEl.className = 'modal-tag ' + (item.cost === 0 ? 'green' : 'hl');
  ov.querySelector('#mRating').textContent = `★ ${item.rating} / 5.0`;
  ov.querySelector('#mLocText').textContent = item.location || 'Andhra Pradesh';
  ov.querySelector('#mDesc').textContent = item.description || '';

  // Tags — use textContent per element
  const tagsEl = ov.querySelector('#mTags');
  tagsEl.innerHTML = '';
  (item.tags || []).forEach(tag => {
    const span = document.createElement('span');
    span.className = 'modal-tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  // Contact button — validate phone before use
  const phone = safePhone(item.phone) || '9999999999';
  const contactBtn = ov.querySelector('#mContact');
  if (contactBtn) {
    contactBtn.href = `tel:${phone}`;
    ov.querySelector('.phone-num').textContent = item.phone || '';
  }

  // Fav button
  const favBtn = ov.querySelector('#mFav');
  if (favBtn) {
    const faved = isFavorite(item.id);
    favBtn.className = 'modal-save-btn' + (faved ? ' saved' : '');
    favBtn.textContent = '';
    const icon = document.createElement('i');
    icon.className = `fa-${faved ? 'solid' : 'regular'} fa-bookmark`;
    favBtn.appendChild(icon);
    favBtn.appendChild(document.createTextNode(faved ? ' Saved' : ' Save'));
    favBtn.onclick = () => {
      const added = toggleFavorite(item.id);
      favBtn.className = 'modal-save-btn' + (added ? ' saved' : '');
      favBtn.innerHTML = '';
      const i2 = document.createElement('i');
      i2.className = `fa-${added ? 'solid' : 'regular'} fa-bookmark`;
      favBtn.appendChild(i2);
      favBtn.appendChild(document.createTextNode(added ? ' Saved' : ' Save'));
      showToast(added ? 'Saved to favorites!' : 'Removed from favorites');
      updateFavBadge();
    };
  }
  ov.classList.add('open');
}

function closeModal() { document.getElementById('detailModal')?.classList.remove('open'); }

/* ══════════════════════════════
   DETAIL MODAL HTML (injected once)
══════════════════════════════ */
const MODAL_HTML = `
<div id="detailModal" class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
    <img id="mImg" class="modal-img" src="" alt="" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=520&q=80'">
    <div class="modal-content">
      <div class="modal-cat" id="mCat"></div>
      <h2 id="mName"></h2>
      <div class="modal-meta">
        <span class="modal-tag hl" id="mCost"></span>
        <span class="modal-tag hl" id="mRating"></span>
        <span class="modal-tag" id="mLoc"><i class="fa-solid fa-location-dot" style="color:var(--saffron);margin-right:4px"></i><span id="mLocText"></span></span>
      </div>
      <div id="mTags" class="modal-meta" style="margin-top:0"></div>
      <p class="modal-desc" id="mDesc"></p>
      <a id="mContact" href="tel:+919999999999" class="contact-now-btn">
        <i class="fa-solid fa-phone"></i>
        <span>Contact Now</span>
        <span class="phone-num" style="font-size:.8rem;opacity:.85"></span>
      </a>
      <div class="modal-actions">
        <button id="mFav" class="modal-save-btn"><i class="fa-regular fa-bookmark"></i> Save</button>
        <button class="modal-save-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i> Close</button>
      </div>
    </div>
  </div>
</div>`;

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('detailModal')) {
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
  }
});