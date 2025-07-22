erDiagram
    %% Entities
    CONTRACTS_CONTRACT {
        int id PK
    }
    CONTRACTS_CONTRACTMANAGER {
        int id PK
        varchar name
        varchar email
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    CONTRACTS_CONTRACTHISTORY {
        int id PK
        int contract_id FK
        timestamp change_date
        varchar change_type
        jsonb old_value
        jsonb new_value
        text comment
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    INVOICES_INVOICE {
        int id PK
        int contract_id FK
        ...その他既存カラム...
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    INVOICES_INVOICE_ITEM {
        int id PK
        int invoice_id FK
        varchar product_name
        numeric unit_price
        int quantity
        numeric amount
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    SALES {
        int id PK
        int contract_id FK
        varchar sales_status
        text skill_info
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    CLIENT_CLIENTINFO {
        int id PK
        int contract_id FK
        text memo
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    CLIENT_TAG {
        int id PK
        varchar name UK
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    CLIENT_CLIENTINFO_MANAGERS {
        int id PK
        int clientinfo_id FK
        int manager_id FK
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    CLIENT_CLIENTINFO_TAGS {
        int id PK
        int clientinfo_id FK
        int tag_id FK
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    BULKMAIL_TEMPLATE {
        varchar name PK,UK
        varchar subject
        text body
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }
    BULKMAIL_SEND_LOG {
        int id PK
        int template_id FK
        varchar subject
        text body
        jsonb recipients
        jsonb cc_list
        jsonb bcc_list
        jsonb attachments
        timestamp sent_at
        varchar status
        text error_message
        timestamp created_at
        timestamp updated_at
        int created_user
        int updated_user
    }

    %% Relationships
    CONTRACTS_CONTRACT ||--o{ INVOICES_INVOICE       : "1 to many"
    INVOICES_INVOICE    ||--o{ INVOICES_INVOICE_ITEM  : "1 to many"
    CONTRACTS_CONTRACT ||--|| SALES                   : "1 to 1"
    CONTRACTS_CONTRACT ||--|| CLIENT_CLIENTINFO       : "1 to 1"
    CONTRACTS_CONTRACT ||--o{ CONTRACTS_CONTRACTHISTORY : "1 to many"
    CLIENT_CLIENTINFO  ||--o{ CLIENT_CLIENTINFO_MANAGERS : "1 to many"
    CONTRACTS_CONTRACTMANAGER ||--o{ CLIENT_CLIENTINFO_MANAGERS : "1 to many"
    CLIENT_CLIENTINFO  ||--o{ CLIENT_CLIENTINFO_TAGS  : "1 to many"
    CLIENT_TAG         ||--o{ CLIENT_CLIENTINFO_TAGS  : "1 to many"
    BULKMAIL_TEMPLATE  ||--o{ BULKMAIL_SEND_LOG       : "1 to many"