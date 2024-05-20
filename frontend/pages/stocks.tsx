import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
} from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";

import Notification from "@/components/Notification";

interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
}

const Stocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [formData, setFormData] = useState({
    stock_id: "",
    quantity: 0,
    price: 0,
    type: "buy",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/stocks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStocks(res.data);
      } catch (err) {
        console.error("Error fetching stocks:", err);
      }
    };

    fetchStocks();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/transactions/${formData.type}", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotification({
        open: true,
        message: `${
          formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
        } successful`,
        severity: "success",
      });
    } catch (err) {
      setNotification({
        open: true,
        message: `Error performing ${formData.type}.`,
        severity: "error",
      });
    }
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Stocks
        </Typography>
        <List>
          {stocks.map((stock) => (
            <ListItem key={stock.id}>
              <ListItemText
                primary={`${stock.symbol} - ${stock.name}`}
                secondary={`$${stock.price}`}
              />
            </ListItem>
          ))}
        </List>
        <Box mt={5}>
          <Typography variant="h5" component="h2" gutterBottom>
            Buy/Sell Stock
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Stock ID"
              name="stock_id"
              value={formData.stock_id}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
            />
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Stocks;
