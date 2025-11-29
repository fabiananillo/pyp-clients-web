"use client";
import React from "react";
import { Card } from "antd";
import Image from "next/image";
import comboBadge from "@/assets/card/comboBadge.svg";
import ticket from "@/assets/card/ticket.svg";
import { Space, Typography } from "antd";
import { ProductInterface } from "@/interfaces/product.interface";

const { Meta } = Card;
const { Text, Link } = Typography;

const ProductCard: React.FC<ProductInterface> = ({ product }) => {
  const {
    slug,
    clientUrl,
    productImages,
    isCombo,
    priceBefore,
    price,
    isCoupon,
    name,
    description,
  } = product;

  const mainImage =
    productImages?.[0].url ||
    "https://pideypasa-s3.s3.amazonaws.com/7365663+4.png";

  return (
    <Link href={`/es/store${clientUrl}`}>
      <Card
        className="w-[200px]"
        cover={
          <div className="relative">
            <Image
              alt={String(slug)}
              src={mainImage}
              className="object-cover"
              style={{ height: 150, width: 250 }}
              width={250}
              height={150}
            />
            {isCombo && (
              <Image
                alt="Combo Badge"
                src={comboBadge}
                width={80}
                height={20}
                className="absolute"
                style={{
                  top: 10,
                  left: -5,
                }}
              />
            )}
          </div>
        }
      >
        <Meta
          title={name}
          description={`${description?.substring(0, 15)}...`}
        />
        <Space direction="horizontal">
          {priceBefore && (
            <Text delete className="text-red">
              {priceBefore}
            </Text>
          )}
          <Text className="font-bold">{price}</Text>
          {isCoupon && (
            <Image alt="ticket" src={ticket} width={15} height={20} />
          )}
        </Space>
      </Card>
    </Link>
  );
};

export default ProductCard;
