import React, { memo } from "react";
import { Badge } from "antd";
import { HeartFilled } from "@ant-design/icons";

interface Props {
    isCarInWishList: boolean;
    className?: string;
}

export const FavoriteBadge: React.FC<Props> = memo(({ isCarInWishList, className = 'favorite' }) => {
    return (
        <div className={className}>
            <Badge count={<HeartFilled className={isCarInWishList ? 'favorite-icon-active' : 'favorite-icon'}/>}/>
        </div>
    );
});
