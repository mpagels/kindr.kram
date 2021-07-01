import styled from 'styled-components/macro'

export default function AbortButton({ onClick, label }) {
  return (
    <Button type="button" onClick={onClick}>
      {label}
    </Button>
  )
}

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  font-weight: bold;
  margin: 10px 0;
  background-color: #e07a5f;
  color: white;
`
