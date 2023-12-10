/* eslint-disable max-len */
// import { useGlobalContext } from '@/hooks/useGlobalContext';
// import { IsomorphicContext } from '@/types';

import { Filter } from '@rckit/icons';
import { useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { debounce } from '@/rckit/utils/debounce';

import { Debug } from '../Debug';
// import { useBillingTransactionListQuery } from '@/queries/billing';

export const FilterMenu = ({ value, setValue }: any) => {
  console.log('FilterMenu render');
  const [showFilter, setShowFilter] = useState(false);
  const [innerValue, setInnerValue] = useState<Record<string, any>>(value);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleSubmit = (e: any) => {
    e?.preventDefault();
    setValue(innerValue);
    // toggleFilter();
  };
  const debouncedHandleSubmit = useCallback(debounce(handleSubmit, 1000), [setValue]);
  console.log('debouncedHandleSubmit', debouncedHandleSubmit);

  const handleChange = (field: string, newValue: any) => {
    setInnerValue({
      ...innerValue,
      [field]: newValue,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Debug json={value} />

      <Row>
        <Col xs={11} md={11}>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => {
                // @ts-ignore
                handleChange('search', e.target.value, () => {
                  debouncedHandleSubmit(innerValue);
                });
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={1} md={1}>
          <Button onClick={toggleFilter} variant={showFilter ? 'primary' : 'outline-primary'}>
            <Filter />
          </Button>
        </Col>
      </Row>

      {showFilter && (
        <>
          <Row>
            <Col xs={6} md={4}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="priceFrom">
                    <Form.Label>Price From</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price from"
                      value={value?.priceFrom}
                      onChange={(e) => handleChange('priceFrom', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="priceTo">
                    <Form.Label>Price To</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price to"
                      value={value?.priceTo}
                      onChange={(e) => handleChange('priceTo', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col xs={6} md={4}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="likesFrom">
                    <Form.Label>Likes From</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Likes from"
                      value={value?.likesFrom}
                      onChange={(e) => handleChange('likesFrom', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="likesTo">
                    <Form.Label>Likes To</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Likes to"
                      value={value?.likesTo}
                      onChange={(e) => handleChange('likesTo', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button type="submit">Apply</Button>
          <Button
            onClick={() => {
              setValue({});
              setInnerValue({});
            }}
            variant="outline-secondary"
            className="ml-2"
          >
            Reset
          </Button>
        </>
      )}
    </Form>
  );
};
