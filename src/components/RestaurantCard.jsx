import { Card, Badge, Button } from "react-bootstrap";

export default function RestaurantCard({ restaurant, isFavorite, onToggle }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={restaurant.imageUrl}
        alt={restaurant.imageAlt}
      />
      <Card.Body>
        <Card.Title>
          {restaurant.name}{" "}
          <small className="text-muted">{restaurant.price}</small>
        </Card.Title>
        <Card.Text>{restaurant.description}</Card.Text>
        <div className="mb-2">
          {restaurant.tags.map((tag) => (
            <Badge key={tag} bg="secondary" className="me-1">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          variant={isFavorite ? "danger" : "outline-danger"}
          size="sm"
          onClick={onToggle}
        >
          {isFavorite ? "Saved to Cravings" : "Add to Cravings"}
        </Button>
      </Card.Body>
    </Card>
  );
}