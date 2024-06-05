import React from 'react';
import { Card, Col, Skeleton } from 'antd';

function CarSkeleton() {
    return (
            <Col xs={{span: 24}} sm={{span: 12}} md={{span: 6}} data-testid="skeleton-wrapper">
                <Card>
                    <Skeleton paragraph={{rows: 10}} active>
                    </Skeleton>
                </Card>
            </Col>
    );
}

export { CarSkeleton };