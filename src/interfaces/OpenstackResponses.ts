export interface SubnetResponse {
        id: string,
        name: string,
        tenant_id: string,
        network_id: string,
        ip_version: number,
        subnetpool_id: null,
        enable_dhcp: boolean,
        ipv6_ra_mode: null,
        ipv6_address_mode: null,
        gateway_ip: string,
        cidr: string,
        allocation_pools: [ { start: string, end: string } ],
        host_routes: Array<any>,
        dns_nameservers: Array<string>,
        description: string,
        service_types: Array<any>,
        tags: Array<any>,
        created_at: string,
        updated_at: string,
        revision_number: number,
        project_id: string
}

export interface AddRouterInterfaceResponse {
    id: string,
    tenant_id: string,
    port_id: string,
    network_id: string,
    subnet_id: string,
    subnet_ids: Array<string>
}

export interface PortDetailsResponse {
    id: string,
    name: string,
    network_id: string,
    tenant_id: string,
    mac_address: string,
    admin_state_up: boolean,
    status: string,
    device_id: string,
    device_owner: string,
    fixed_ips: [
        {
        subnet_id: string,
        ip_address: string
        }
    ],
    allowed_address_pairs: Array<any>,
    extra_dhcp_opts: Array<any>,
    security_groups: Array<any>,
    description: string,
    'binding:vnic_type': string,
    'binding:profile': any,
    'binding:host_id': string,
    'binding:vif_type': string,
    'binding:vif_details': any,
    port_security_enabled: boolean,
    tags: Array<any>,
    created_at: string,
    updated_at: string,
    revision_number: number,
    project_id: string
}

interface AllocationPools {
    start:string,
    end:string
}

export interface SubnetData {
    network_id: string,
    ip_version: number,
    cidr: string,
    enable_dhcp: boolean,
    gateway_ip: string,
    allocation_pools: Array<AllocationPools>,
    dns_nameservers: Array<string>
}