import { computed } from "vue";
import { useLanguage } from "./useLanguage";

const translations = {
  en: {
    // Header
    appName: "Vlur",
    documentTitle: "Vlur - Your Entertainment Hub",
    searchPlaceholder: "Search recommendations...",
    backToHome: "Back to home",
    returnToApp: "Return to App",
    continueUsing: "Continue Using",
    community: "Community",
    backToApp: "Back to App",
    back: "Back",

    // Navigation
    recommendations: "Recommendations",
    watchList: "Watch List",

    // Landing Page
    heroTag: "Your Entertainment Hub",
    heroTitle: "Discover & Organize",
    heroSubtitle: "Your Entertainment",
    heroDescription:
      "Keep track of all your favorite films, series, and anime recommendations in one place. Rate, categorize, and never forget a great recommendation again.",
    getStarted: "Get Started",
    startNow: "Start Now",
    learnMore: "Learn More",
    exploreCommunity: "Explore Community",

    // Welcome Back (for returning users)
    welcomeBack: "Welcome Back!",
    welcomeBackTitle: "Continue Your Journey",
    welcomeBackDescription:
      "Pick up where you left off and discover more amazing entertainment recommendations.",
    continueJourney: "Continue Journey",
    totalRecommendations: "Total Saved",
    favoriteCategory: "Top Category",
    averageRating: "Avg Rating",
    none: "None",

    // Community Stats
    communityMembers: "Community Members",
    sharedRecommendations: "Shared Recommendations",
    communityRating: "Community Rating",

    // Community Page
    discoverTogether: "Discover Together",
    communityTitle: "Community Recommendations",
    communityDescription:
      "Discover amazing entertainment recommendations shared by fellow enthusiasts from around the world.",
    trending: "Trending",
    recent: "Recent",
    topRated: "Top Rated",
    saved: "Saved",
    loadMore: "Load More",
    justNow: "Just now",
    ago: "ago",
    noSavedPosts: "No saved posts yet",
    startSavingPosts: "Start saving posts you love to see them here!",
    explorePosts: "Explore Posts",

    // Community Highlight
    joinCommunity: "Join the Community",
    communityHighlightTitle: "Connect with Fellow Entertainment Lovers",
    communityHighlightDescription:
      "Join thousands of users sharing their favorite discoveries, trending recommendations, and hidden gems.",
    discoverTrending: "Discover Trending",
    discoverTrendingDesc:
      "Find the most popular recommendations from the community.",
    sharePassion: "Share Your Passion",
    sharePassionDesc:
      "Connect with others who share your entertainment interests.",
    saveForLater: "Save for Later",
    saveForLaterDesc: "Bookmark posts to create your personal collection.",

    // Features
    featuresTitle: "Everything You Need",
    featuresDescription:
      "Powerful features to help you organize and discover your next favorite entertainment.",
    featureOrganizeTitle: "Smart Organization",
    featureOrganizeDesc:
      "Organize your recommendations by category and genre with intelligent filtering and search capabilities.",
    featureSearchTitle: "Powerful Search",
    featureSearchDesc:
      "Find any recommendation instantly with our advanced search that looks through names and genres.",
    featureGenresTitle: "Rich Genres",
    featureGenresDesc:
      "Choose from 12 different genres including Action, Romance, Horror, Sci-Fi, and more.",
    featureMultilingualTitle: "Multilingual",
    featureMultilingualDesc:
      "Full support for English and Spanish with more languages coming soon.",
    featureResponsiveTitle: "Mobile Ready",
    featureResponsiveDesc:
      "Beautiful responsive design that works perfectly on all devices and screen sizes.",
    featureSecureTitle: "Secure Storage",
    featureSecureDesc:
      "Your data is safely stored locally in your browser with no external dependencies.",

    // Stats
    statsTitle: "Built for Entertainment Lovers",
    statCategories: "Categories",
    statGenres: "Genres",
    statLanguages: "Languages",
    statRatings: "Star Ratings",

    // CTA
    ctaTitle: "Ready to Get Started?",
    ctaDescription:
      "Join thousands of entertainment enthusiasts who trust Vlur to organize their recommendations.",
    startFree: "Start Free Now",
    readyToContinue: "Ready to Continue?",
    continueDescription:
      "Your recommendations are waiting for you. Continue organizing and discovering amazing entertainment.",
    backToRecommendations: "Back to Recommendations",

    // Footer
    footerText: "© 2025 Vlur. Built with ❤️ for entertainment lovers.",

    // Stats
    total: "Total",
    films: "Films",
    series: "Series",
    anime: "Anime",

    // Categories
    all: "All",
    film: "Film",

    // Form
    addRecommendation: "Add Recommendation",
    add: "Add",
    addFirst: "Add Your First",
    category: "Category",
    selectCategory: "Select category",
    name: "Name",
    enterName: "Enter the name...",
    genre: "Genre",
    selectGenre: "Select genre",
    rating: "Rating",
    star: "star",
    stars: "stars",
    cancel: "Cancel",

    // Watch List
    watchListDescription:
      "Keep track of movies, series, and anime you want to watch later.",
    addToWatchList: "Add to Watch List",
    addToWatch: "Add to Watch",
    noWatchListItems: "Your watch list is empty",
    startAddingToWatchList:
      "Add items you want to watch later to keep track of them.",
    addFirstWatchListItem: "Add Your First Item",
    title: "Title",
    priority: "Priority",
    dateAdded: "Date Added",
    actions: "Actions",
    high: "High",
    medium: "Medium",
    low: "Low",
    notes: "Notes",
    optional: "Optional",
    addNotes: "Add any notes or reminders...",
    markAsWatched: "Mark as watched",
    delete: "Delete",

    // Genres
    action: "Action",
    adventure: "Adventure",
    comedy: "Comedy",
    drama: "Drama",
    fantasy: "Fantasy",
    horror: "Horror",
    mystery: "Mystery",
    romance: "Romance",
    sciFi: "Sci-Fi",
    thriller: "Thriller",
    documentary: "Documentary",
    animation: "Animation",

    // Empty state
    noRecommendations: "No recommendations yet",
    startAdding: "Start by adding your first recommendation!",

    // Theme
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",

    // Language
    language: "Language",
    english: "English",
    spanish: "Spanish",

    // Recommendation Detail Modal
    viewDetails: "View Details",
    yourRecommendation: "Your Recommendation",
    you: "You",
    addedOn: "Added on",
    sharedBy: "Shared by",
    recommendationDescription:
      'I highly recommend "{name}" - it\'s an amazing {genre} with a {rating}/5 rating!',
    noCommentsYet: "No comments yet",
    beFirstToComment: "Be the first to share your thoughts!",
    addComment: "Add a comment...",
    reply: "Reply",
  },
  es: {
    // Header
    appName: "Vlur",
    documentTitle: "Vlur - Tu Centro de Entretenimiento",
    searchPlaceholder: "Buscar recomendaciones...",
    backToHome: "Volver al inicio",
    returnToApp: "Volver a la App",
    continueUsing: "Continuar Usando",
    community: "Comunidad",
    backToApp: "Volver a la App",
    back: "Volver",

    // Navigation
    recommendations: "Recomendaciones",
    watchList: "Lista de Pendientes",

    // Landing Page
    heroTag: "Tu Centro de Entretenimiento",
    heroTitle: "Descubre y Organiza",
    heroSubtitle: "Tu Entretenimiento",
    heroDescription:
      "Mantén un registro de todas tus películas, series y anime favoritos en un solo lugar. Califica, categoriza y nunca olvides una gran recomendación.",
    getStarted: "Comenzar",
    startNow: "Empezar Ahora",
    learnMore: "Saber Más",
    exploreCommunity: "Explorar Comunidad",

    // Welcome Back (for returning users)
    welcomeBack: "¡Bienvenido de Vuelta!",
    welcomeBackTitle: "Continúa Tu Viaje",
    welcomeBackDescription:
      "Retoma donde lo dejaste y descubre más recomendaciones de entretenimiento increíbles.",
    continueJourney: "Continuar Viaje",
    totalRecommendations: "Total Guardadas",
    favoriteCategory: "Categoría Principal",
    averageRating: "Calificación Prom.",
    none: "Ninguna",

    // Community Stats
    communityMembers: "Miembros de la Comunidad",
    sharedRecommendations: "Recomendaciones Compartidas",
    communityRating: "Calificación Comunidad",

    // Community Page
    discoverTogether: "Descubrir Juntos",
    communityTitle: "Recomendaciones de la Comunidad",
    communityDescription:
      "Descubre recomendaciones increíbles de entretenimiento compartidas por entusiastas de todo el mundo.",
    trending: "Tendencias",
    recent: "Recientes",
    topRated: "Mejor Calificadas",
    saved: "Guardadas",
    loadMore: "Cargar Más",
    justNow: "Ahora mismo",
    ago: "hace",
    noSavedPosts: "Aún no hay publicaciones guardadas",
    startSavingPosts:
      "¡Comienza a guardar las publicaciones que te gusten para verlas aquí!",
    explorePosts: "Explorar Publicaciones",

    // Community Highlight
    joinCommunity: "Únete a la Comunidad",
    communityHighlightTitle: "Conecta con Otros Amantes del Entretenimiento",
    communityHighlightDescription:
      "Únete a miles de usuarios compartiendo sus descubrimientos favoritos, recomendaciones populares y joyas ocultas.",
    discoverTrending: "Descubrir Tendencias",
    discoverTrendingDesc:
      "Encuentra las recomendaciones más populares de la comunidad.",
    sharePassion: "Comparte tu Pasión",
    sharePassionDesc:
      "Conecta con otros que comparten tus intereses de entretenimiento.",
    saveForLater: "Guardar para Después",
    saveForLaterDesc: "Marca publicaciones para crear tu colección personal.",

    // Features
    featuresTitle: "Todo Lo Que Necesitas",
    featuresDescription:
      "Funciones poderosas para ayudarte a organizar y descubrir tu próximo entretenimiento favorito.",
    featureOrganizeTitle: "Organización Inteligente",
    featureOrganizeDesc:
      "Organiza tus recomendaciones por categoría y género con filtrado inteligente y capacidades de búsqueda.",
    featureSearchTitle: "Búsqueda Poderosa",
    featureSearchDesc:
      "Encuentra cualquier recomendación al instante con nuestra búsqueda avanzada que examina nombres y géneros.",
    featureGenresTitle: "Géneros Variados",
    featureGenresDesc:
      "Elige entre 12 géneros diferentes incluyendo Acción, Romance, Terror, Ciencia Ficción y más.",
    featureMultilingualTitle: "Multiidioma",
    featureMultilingualDesc:
      "Soporte completo para inglés y español con más idiomas próximamente.",
    featureResponsiveTitle: "Optimizado para Móvil",
    featureResponsiveDesc:
      "Diseño responsivo hermoso que funciona perfectamente en todos los dispositivos y tamaños de pantalla.",
    featureSecureTitle: "Almacenamiento Seguro",
    featureSecureDesc:
      "Tus datos se almacenan de forma segura localmente en tu navegador sin dependencias externas.",

    // Stats
    statsTitle: "Construido para Amantes del Entretenimiento",
    statCategories: "Categorías",
    statGenres: "Géneros",
    statLanguages: "Idiomas",
    statRatings: "Calificaciones de Estrellas",

    // CTA
    ctaTitle: "¿Listo para Comenzar?",
    ctaDescription:
      "Únete a miles de entusiastas del entretenimiento que confían en Vlur para organizar sus recomendaciones.",
    startFree: "Comenzar Gratis Ahora",
    readyToContinue: "¿Listo para Continuar?",
    continueDescription:
      "Tus recomendaciones te están esperando. Continúa organizando y descubriendo entretenimiento increíble.",
    backToRecommendations: "Volver a Recomendaciones",

    // Footer
    footerText:
      "© 2025 Vlur. Construido con ❤️ para amantes del entretenimiento.",

    // Stats
    total: "Total",
    films: "Películas",
    series: "Series",
    anime: "Anime",

    // Categories
    all: "Todas",
    film: "Película",

    // Form
    addRecommendation: "Agregar Recomendación",
    add: "Agregar",
    addFirst: "Agregar Primera",
    category: "Categoría",
    selectCategory: "Seleccionar categoría",
    name: "Nombre",
    enterName: "Ingresa el nombre...",
    genre: "Género",
    selectGenre: "Seleccionar género",
    rating: "Calificación",
    star: "estrella",
    stars: "estrellas",
    cancel: "Cancelar",

    // Watch List
    watchListDescription:
      "Mantén un registro de películas, series y anime que quieres ver más tarde.",
    addToWatchList: "Agregar a Lista de Pendientes",
    addToWatch: "Agregar a Ver",
    noWatchListItems: "Tu lista de pendientes está vacía",
    startAddingToWatchList:
      "Agrega elementos que quieras ver más tarde para hacer un seguimiento.",
    addFirstWatchListItem: "Agregar Tu Primer Elemento",
    title: "Título",
    priority: "Prioridad",
    dateAdded: "Fecha Agregada",
    actions: "Acciones",
    high: "Alta",
    medium: "Media",
    low: "Baja",
    notes: "Notas",
    optional: "Opcional",
    addNotes: "Agregar notas o recordatorios...",
    markAsWatched: "Marcar como visto",
    delete: "Eliminar",

    // Genres
    action: "Acción",
    adventure: "Aventura",
    comedy: "Comedia",
    drama: "Drama",
    fantasy: "Fantasía",
    horror: "Terror",
    mystery: "Misterio",
    romance: "Romance",
    sciFi: "Ciencia Ficción",
    thriller: "Suspenso",
    documentary: "Documental",
    animation: "Animación",

    // Empty state
    noRecommendations: "Aún no hay recomendaciones",
    startAdding: "¡Comienza agregando tu primera recomendación!",

    // Theme
    switchToLight: "Cambiar a modo claro",
    switchToDark: "Cambiar a modo oscuro",

    // Language
    language: "Idioma",
    english: "Inglés",
    spanish: "Español",

    // Recommendation Detail Modal
    viewDetails: "Ver Detalles",
    yourRecommendation: "Tu Recomendación",
    you: "Tú",
    addedOn: "Agregado el",
    sharedBy: "Compartido por",
    recommendationDescription:
      'Recomiendo mucho "{name}" - ¡es un {genre} increíble con calificación {rating}/5!',
    noCommentsYet: "Aún no hay comentarios",
    beFirstToComment: "¡Sé el primero en compartir tus pensamientos!",
    addComment: "Agregar un comentario...",
    reply: "Responder",
  },
};

export function useTranslations() {
  const { currentLanguage } = useLanguage();

  const t = computed(() => {
    return (
      key: keyof typeof translations.en,
      params?: Record<string, string>
    ) => {
      let text =
        translations[currentLanguage.value][key] || translations.en[key];

      // Simple template replacement
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          text = text.replace(`{${param}}`, value);
        });
      }

      return text;
    };
  });

  return { t };
}
