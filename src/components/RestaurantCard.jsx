import { Card, Badge, Button } from "react-bootstrap";

export default function RestaurantCard({
  // These values are shown on each restaurants card 
  restaurant,
  isSaved,
  onToggleCraving,
  isProfileMatch = false,
}) {
  return (
    <Card className="shadow-sm h-100 restaurant-card">
      <Card.Img
        variant="top"
        src={restaurant.imageUrl}
        alt={restaurant.imageAlt}
      />
      <Card.Body>
        <Card.Title className="mb-1">
          {restaurant.name}{" "}
          <small className="text-muted">{restaurant.price}</small>
        </Card.Title>

        {isProfileMatch && (
          <Badge bg="success" className="mb-2">
            Matches your profile
          </Badge>
        )}

        <Card.Text>{restaurant.description}</Card.Text>

        <div className="mb-2">
          {restaurant.tags.map((tag) => (
            <Badge key={tag} bg="secondary" className="me-1 mb-1">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          variant={isSaved ? "outline-danger" : "danger"}
          size="sm"
          onClick={onToggleCraving}
        >
          {isSaved ? "Remove from Cravings" : "Add to Cravings"}
        </Button>
      </Card.Body>
    </Card>
  );
}