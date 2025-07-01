// /src/contracts/ContractForm.tsx
import React, { useState } from 'react'
import type { Contract, ContractManager } from '../types/contract'
import { updateContract } from '../api/contracts'
import formStyles from '../styles/ContractForm.module.css'
import '../styles/modal.css'

type Props = {
  contract: Contract
  onClose: () => void
  onUpdated: () => void
}

type FieldDef =
  | { key: Extract<keyof Contract, string>; label: string; type?: 'text' }
  | { key: Extract<keyof Contract, string>; label: string; type: 'number' }
  | { key: Extract<keyof Contract, string>; label: string; type: 'date' }

const fields = [
  { key: 'employee_name',       label: '社員名',        type: 'text'   },
  { key: 'project_name',        label: '案件名',        type: 'text'   },
  { key: 'client_company',      label: '契約先会社名',  type: 'text'   },
  { key: 'client_address',      label: '契約先住所',    type: 'text'   },
  { key: 'contract_start_date', label: '契約開始日',    type: 'date'   },
  { key: 'contract_end_date',   label: '契約終了日',    type: 'date'   },
  { key: 'unit_price',          label: '単価（万円/月）', type: 'number' },
  { key: 'overtime_unit_price', label: '超過単価（円/時）', type: 'number' },
  { key: 'deduction_unit_price',label: '控除単価（円/時）', type: 'number' },
  { key: 'working_hours_min',   label: '下限時間（h/月）',  type: 'number' },
  { key: 'working_hours_max',   label: '上限時間（h/月）',  type: 'number' },
  { key: 'payment_site_days',   label: '支払いサイト（日）', type: 'number' },
] as const satisfies readonly FieldDef[]

const ContractForm: React.FC<Props> = ({ contract, onClose, onUpdated }) => {
  const [formData, setFormData] = useState<Contract>({ ...contract })
  const [managers, setManagers] = useState<ContractManager[]>([...contract.managers])

  // 全ての Contract プロパティをキーに取れるよう修正
  function handleChange<K extends keyof Contract>(
    key: K,
    value: Contract[K]
  ) {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  function handleManagerChange<K extends keyof ContractManager>(
    index: number,
    key: K,
    value: ContractManager[K]
  ) {
    const updated = [...managers]
    updated[index] = {
      ...updated[index],
      [key]: value,
    }
    setManagers(updated)
  }

  const addManager = () => {
    setManagers([...managers, { name: '', email: '' }])
  }

  const removeManager = (index: number) => {
    const updated = [...managers]
    updated.splice(index, 1)
    setManagers(updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await updateContract(formData.id!, { ...formData, managers })
    onUpdated()
  }

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <form className={formStyles.formContainer} onSubmit={handleSubmit}>
          <h2 className={formStyles.formTitle}>契約情報の編集</h2>

          {fields.map(({ key, label, type }) => {
            const fieldValue = formData[key] ?? ''
            return (
              <div key={key} className={formStyles.formGroup}>
                <label className={formStyles.label}>{label}</label>
                <input
                  className={formStyles.input}
                  type={type ?? 'text'}
                  value={String(fieldValue)}
                  onChange={e => {
                    const raw = e.target.value
                    const parsed = type === 'number' ? Number(raw) : raw
                    handleChange(key, parsed as Contract[typeof key])
                  }}
                />
              </div>
            )
          })}

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>働き方</label>
            <select
              className={formStyles.select}
              value={formData.work_style}
              onChange={e =>
                handleChange(
                  'work_style',
                  e.target.value as Contract['work_style']
                )
              }
            >
              <option value="remote">リモート</option>
              <option value="onsite">常駐</option>
              <option value="hybrid">ハイブリッド</option>
            </select>
          </div>

          <div className={formStyles.formGroup}>
            <label className={formStyles.label}>担当者</label>
            {managers.map((m, i) => (
              <div key={i} className={formStyles.managerGroup}>
                <input
                  type="text"
                  className={formStyles.input}
                  value={m.name}
                  onChange={e => handleManagerChange(i, 'name', e.target.value)}
                  placeholder="氏名"
                />
                <input
                  type="email"
                  className={formStyles.input}
                  value={m.email}
                  onChange={e => handleManagerChange(i, 'email', e.target.value)}
                  placeholder="メールアドレス"
                />
                <button
                  type="button"
                  onClick={() => removeManager(i)}
                >
                  削除
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addManager}
            >
              担当者を追加
            </button>
          </div>

          <div className={formStyles.buttonRow}>
            <button
              type="button"
              className={formStyles.cancelButton}
              onClick={onClose}
            >
              キャンセル
            </button>
            <button type="submit" className={formStyles.saveButton}>
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContractForm