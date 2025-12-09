export default function About() {
  return (
    <div>
      <h1>About Campus Cravings</h1>
      <p>
        Campus Cravings is a student-built web application designed to make food
        decisions easier around UW-Madison's campus. Instead of endlessly debating where
        to eat, students can filter through restaurants by their current cravings, take a mood quiz,
        browse food spots, and save favorites to return to later.
      </p>

      <h2>Main Features</h2>
      <ul>
        <li>Search and browse 30+ campus-area restaurants</li>
        <li>Filter restaurants by Cheap, Study Snacks, Late Night, or Treat Yourself</li>
        <li>Food Mood Quiz that recommends spots based on your answers</li>
        <li>User profile + favorites saved using LocalStorage</li>
        <li>Clean responsive UI built with React Bootstrap</li>
      </ul>

      <h2>Tech Stack Used</h2>
      <ul>
        <li>React + Vite</li>
        <li>React Router for multi-page navigation</li>
        <li>React Bootstrap for styling</li>
        <li>LocalStorage for persistent favorites/profile</li>
        <li>Deployed with GitHub Pages</li>
      </ul>

      <h2>How to Use</h2>
      <p>
        Begin on home page where you're given the choice of taking the food mood
        quiz, choose common moods and see restaurants in the area that match that,
        or link given to profile page. Navigate to the explore page through the top 
        navbar and see 30 different restaurants. Use the filter bar where you can choose 
        cheap & fast, study snacks, late night, or treat yourself as options. While looking 
        through restaurants, can add restaurants to your cravings to save for later. If mood 
        quiz hasn't been taken yet, you can navigate to it also through the nav bar. Lastly you 
        can navigate to the profile page and enter personal details so restaurants suggested are 
        catered to your preferences. Profile asks questions such as name, favorite cuisine,
        typical budget, and short bio.
      </p>

      <p className="text-muted mt-3">
        Built as a final project for CS571 course.
      </p>
    </div>
  );
}