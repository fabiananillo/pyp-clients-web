"use client";
import React, { useState, useEffect } from "react";
import { Modal, List, Button, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { BRANCHES_BY_COMPANY } from "../../graphQL/query/companies";
import useLocationStore from "../../hooks/useLocation";
import useCartStore from "../../hooks/useCartStore";

interface BranchSelectorProps {
  open: boolean;
  companyId: string;
  onBranchSelected: (branchId: string) => void;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({ 
  open, 
  companyId, 
  onBranchSelected 
}) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const { city } = useLocationStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setUserLocation({
            latitude: 11.0236033,
            longitude: -74.8037831,
          });
        }
      );
    }
  }, []);

  const { data, loading } = useQuery(BRANCHES_BY_COMPANY, {
    variables: {
      cityId: city?.id || "656dbb37-19a2-40e8-8c6a-96b770e214ae",
      companyId,
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
    },
    skip: !open || !userLocation || !companyId,
  });

  const branches = data?.branchesByCompany || [];

  const handleBranchSelect = (branchId: string) => {
    onBranchSelected(branchId);
  };

  return (
    <Modal
      title="Selecciona una sucursal"
      open={open}
      footer={null}
      closable={false}
      centered
      width={400}
    >
      {loading ? (
        <div className="text-center py-8">
          <Spin size="large" />
        </div>
      ) : (
        <List
          dataSource={branches}
          renderItem={(branch: any) => (
            <List.Item>
              <Button
                type="text"
                className="w-full text-left p-4 hover:bg-gray-50"
                onClick={() => handleBranchSelect(branch.id)}
              >
                <div className="flex items-center">
                  <EnvironmentOutlined className="mr-3 text-primary" />
                  <span className="font-medium">{branch.name}</span>
                </div>
              </Button>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default BranchSelector;