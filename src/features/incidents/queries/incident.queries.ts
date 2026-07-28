import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  getOperatorIncidents,
  reportIncident,
} from "@/features/incidents/api/incidents.api";

export const incidentKeys = {
  all: ["incidents"] as const,
  operatorList: () =>
    [...incidentKeys.all, "operator"] as const,
};

export function useReportIncident() {
  return useMutation({
    mutationFn: reportIncident,
  });
}

export function useOperatorIncidents() {
  return useQuery({
    queryKey: incidentKeys.operatorList(),
    queryFn: getOperatorIncidents,
  });
}
