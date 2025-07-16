import { categoriesData } from './categoriesData';
import { medocCommunes } from './communesData';

const generateListings = (category, count, baseId) => {
  const listings = [];
  const sellerNames = ['Marie D.', 'Pierre M.', 'Jean D.', 'Sophie L.', 'Michel R.', 'Laura P.', 'Thomas B.', 'Emma M.', 'Kevin D.', 'Alain G.'];

  const categoryImageKeywords = {
    'vehicles': 'car',
    'real-estate': 'modern house',
    'multimedia': 'electronics gadgets',
    'home-garden': 'cozy living room',
    'fashion': 'fashion clothing',
    'hobbies-leisure': 'sports equipment',
    'agri-viti': 'vineyard tractor',
    'seasonal-jobs': 'summer job beach',
    'surfing-skating': 'surfing wave',
    'baby-kids': 'baby toys',
    'services': 'handyman tools',
    'rentals-various': 'equipment rental',
    'community': 'community help',
    'events-medoc': 'local festival',
  };

  for (let i = 1; i <= count; i++) {
    const randomLocation = medocCommunes[Math.floor(Math.random() * medocCommunes.length)];
    const randomSellerName = sellerNames[Math.floor(Math.random() * sellerNames.length)];
    const randomSellerId = `seller_${Math.floor(Math.random() * 1000)}`;
    const randomViews = Math.floor(Math.random() * 250) + 5;
    let randomPrice;

    if (category.id === 'community' && category.subCategories && (category.subCategories.find(sc => sc.id === 'donations') || category.subCategories.find(sc => sc.id === 'exchanges'))) {
      randomPrice = 0;
    } else if (category.id === 'events-medoc') {
      randomPrice = Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0; 
    }
    else {
      randomPrice = Math.floor(Math.random() * (category.id === 'real-estate' ? 2000 : category.id === 'vehicles' ? 500 : 100)) * (category.id === 'real-estate' ? 100 : category.id === 'vehicles' ? 10 : 1) + (category.id === 'real-estate' ? 50000 : category.id === 'vehicles' ? 500 : 10);
    }
    const date = new Date(Date.now() - Math.floor(Math.random() * 45) * 24 * 60 * 60 * 1000); 

    const imageKeyword = categoryImageKeywords[category.id] || category.id.replace('-', ',');

    let listing = {
      id: `listing_${baseId}_${i}`,
      title: `Superbe ${category.name.toLowerCase()} ${i} à ${randomLocation}`,
      description: `Incroyable opportunité pour ce ${category.name.toLowerCase()} situé à ${randomLocation}. En excellent état, peu servi. Idéal pour ${category.id === 'vehicles' ? 'vos déplacements' : category.id === 'real-estate' ? 'votre famille' : 'tous les jours'}. Contactez ${randomSellerName} pour plus d'informations. Ne manquez pas cette affaire unique dans le Médoc !`,
      price: randomPrice,
      category: category.id,
      sub_category: category.subCategories && category.subCategories.length > 0 ? category.subCategories[Math.floor(Math.random() * category.subCategories.length)].id : null,
      location: randomLocation,
      images: [`https://source.unsplash.com/random/800x600?${imageKeyword},${i}_${Math.random()}`], 
      created_at: date.toISOString(),
      sellerId: randomSellerId,
      seller_name: randomSellerName,
      views: randomViews,
      status: 'active',
      listing_type: randomPrice === 0 ? 'gratuit' : (Math.random() > 0.8 ? 'payant' : 'gratuit'), 
      additional_fields: {}
    };

    if (category.fields && category.fields.length > 0) {
      listing.additional_fields = {};
      category.fields.forEach(field => {
        if (field.type === 'text' || field.type === 'number') {
          listing.additional_fields[field.name] = field.type === 'number' ? Math.floor(Math.random() * 100) : `Valeur ${field.name} ${i}`;
        } else if (field.type === 'select' && field.options && field.options.length > 0) {
          listing.additional_fields[field.name] = field.options[Math.floor(Math.random() * field.options.length)];
        } else if (field.type === 'checkbox') {
          listing.additional_fields[field.name] = Math.random() > 0.5;
        } else if (field.type === 'date') {
          const eventDate = new Date(Date.now() + Math.floor(Math.random() * 30 + 1) * 24 * 60 * 60 * 1000);
          listing.additional_fields[field.name] = eventDate.toISOString().split('T')[0];
        } else if (field.type === 'time') {
          listing.additional_fields[field.name] = `${String(Math.floor(Math.random() * 12) + 9).padStart(2, '0')}:${String(Math.floor(Math.random() * 4) * 15).padStart(2, '0')}`;
        }
      });
    }
    
    switch (category.id) {
      case 'vehicles':
        listing.additional_fields.brand = ['Peugeot', 'Renault', 'Citroën', 'Volkswagen', 'Ford'][Math.floor(Math.random() * 5)];
        listing.additional_fields.model = ['Clio', '208', 'Golf', 'Fiesta', 'C3'][Math.floor(Math.random() * 5)];
        listing.additional_fields.year = 2010 + Math.floor(Math.random() * 13);
        listing.additional_fields.mileage = Math.floor(Math.random() * 180000) + 10000;
        listing.title = `${listing.additional_fields.brand} ${listing.additional_fields.model} ${listing.additional_fields.year} - ${listing.additional_fields.mileage}km`;
        listing.images = [`https://source.unsplash.com/random/800x600?${listing.additional_fields.brand.toLowerCase()}%20${listing.additional_fields.model.toLowerCase()},${i}_${Math.random()}`];
        break;
      case 'real-estate':
        listing.additional_fields.propertyType = ['Maison', 'Appartement', 'Terrain'][Math.floor(Math.random() * 3)];
        listing.additional_fields.surface = Math.floor(Math.random() * 150) + 30;
        listing.additional_fields.rooms = Math.floor(Math.random() * 5) + 2;
        listing.title = `${listing.additional_fields.propertyType} ${listing.additional_fields.rooms} pièces ${listing.additional_fields.surface}m² à ${listing.location}`;
        listing.images = [`https://source.unsplash.com/random/800x600?modern%20${listing.additional_fields.propertyType.toLowerCase()}%20exterior,${i}_${Math.random()}`];
        break;
      case 'multimedia':
        listing.additional_fields.itemType = ['Téléphone', 'Ordinateur portable', 'Tablette', 'Télévision'][Math.floor(Math.random() * 4)];
        listing.additional_fields.brand = ['Apple', 'Samsung', 'HP', 'Sony', 'LG'][Math.floor(Math.random() * 5)];
        listing.additional_fields.condition = ['Comme neuf', 'Très bon état', 'Bon état'][Math.floor(Math.random() * 3)];
        listing.title = `${listing.additional_fields.itemType} ${listing.additional_fields.brand} - ${listing.additional_fields.condition}`;
        listing.images = [`https://source.unsplash.com/random/800x600?${listing.additional_fields.itemType.toLowerCase()}%20${listing.additional_fields.brand.toLowerCase()},${i}_${Math.random()}`];
        break;
      case 'hobbies-leisure':
        listing.additional_fields.itemType = ['Vélo de route', 'VTT', 'Haltères', 'Kayak', 'Chaussures de marche'][Math.floor(Math.random() * 5)];
        listing.title = `${listing.additional_fields.itemType} - Parfait état`;
        if(listing.sub_category === 'bikes'){
          listing.title = `${listing.additional_fields.itemType} de loisir - Parfait état`;
          listing.images = [`https://source.unsplash.com/random/800x600?bicycle,${i}_${Math.random()}`];
        } else {
          listing.images = [`https://source.unsplash.com/random/800x600?sports%20equipment,${i}_${Math.random()}`];
        }
        break;
      case 'services':
        listing.additional_fields.serviceType = ['Cours de Guitare', 'Jardinage', 'Baby-sitting', 'Réparation PC', 'Coaching sportif'][Math.floor(Math.random() * 5)];
        listing.title = `${listing.additional_fields.serviceType} à ${listing.location}`;
        listing.images = [`https://source.unsplash.com/random/800x600?service%20tools,${i}_${Math.random()}`];
        listing.price = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 10 : 0; 
        listing.listing_type = listing.price === 0 ? 'gratuit' : 'payant';
        break;
      case 'rentals-various':
        listing.additional_fields.itemToRent = ['Tondeuse', 'Remorque', 'Perceuse', 'Chapiteau', 'Sono'][Math.floor(Math.random() * 5)];
        listing.title = `Location ${listing.additional_fields.itemToRent} à ${listing.location}`;
        listing.images = [`https://source.unsplash.com/random/800x600?tool%20rental,${i}_${Math.random()}`];
        listing.listing_type = 'payant';
        break;
      case 'community':
        const adType = ['Don', 'Échange', 'Bénévolat'][Math.floor(Math.random() * 3)];
        listing.title = `${adType}: ${category.name.toLowerCase()} à ${listing.location}`;
        listing.images = [`https://source.unsplash.com/random/800x600?community%20helping,${i}_${Math.random()}`];
        listing.price = 0;
        listing.listing_type = 'gratuit';
        break;
      case 'events-medoc':
        listing.additional_fields.eventType = ['Concert', 'Marché', 'Festival', 'Compétition sportive'][Math.floor(Math.random() * 4)];
        const eventStartDate = new Date(Date.now() + Math.floor(Math.random() * 30 + 1) * 24 * 60 * 60 * 1000);
        listing.additional_fields.eventDateStart = eventStartDate.toISOString().split('T')[0];
        listing.additional_fields.eventTimeStart = `${String(Math.floor(Math.random() * 12) + 9).padStart(2, '0')}:${String(Math.floor(Math.random() * 4) * 15).padStart(2, '0')}`;
        listing.title = `${listing.additional_fields.eventType}: ${category.name} ${i} à ${listing.location} - ${new Date(listing.additional_fields.eventDateStart).toLocaleDateString('fr-FR')}`;
        listing.images = [`https://source.unsplash.com/random/800x600?local%20${listing.additional_fields.eventType.toLowerCase()},${i}_${Math.random()}`];
        listing.listing_type = listing.price === 0 ? 'gratuit' : 'payant';
        listing.additional_fields.eventAdmission = listing.price === 0 ? 'Gratuite' : 'Payante';
        break;
    }
    listings.push(listing);
  }
  return listings;
};

export const mockListings = categoriesData.reduce((acc, category, index) => {
  let listingsPerCategory = 10;
  if (category.id === 'events-medoc') listingsPerCategory = 20;
  return acc.concat(generateListings(category, listingsPerCategory, `${category.id}_${index * 10}`));
}, []);