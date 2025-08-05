// src/components/CatalogList.js
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CatalogApi } from '../api/Catalog/CatalogApi';
import { Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';

const CatalogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  // Запрос товаров
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', currentPage],
    queryFn: () => CatalogApi({ page: currentPage, per_page: perPage }),
    staleTime: 1000 * 60 * 5 // 5 минут
  });

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Каталог товаров
      </Typography>

      {isLoading && <CircularProgress />}
      {error && <Typography color="error">Ошибка: {error.message}</Typography>}
      {data?.items && (
        <div>
          <Typography variant="h6" gutterBottom>
            Найдено {data.pagination.total} товаров
          </Typography>
          <Grid container spacing={2}>
            {data.items.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography>Цена: ${product.price.toFixed(2)}</Typography>
                  <Typography>В наличии: {product.stock_quantity} шт.</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: '16px' }}>
            <Typography>
              Страница {data.pagination.page} из {data.pagination.totalPages}
            </Typography>
            <Button
              variant="contained"
              disabled={!data.pagination.has_prev}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{ marginRight: '8px' }}
            >
              Предыдущая
            </Button>
            <Button
              variant="contained"
              disabled={!data.pagination.has_next}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Следующая
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogList;