import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Redirect = ({
  url,
}: {
  url: ({ searchParams }: { searchParams?: URLSearchParams }) => string;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    navigate(url({ searchParams }));
  }, [searchParams, navigate]);
  return null;
};
