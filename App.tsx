import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  course: 'Entrée' | 'Mains' | 'Desserts';
  price: number;
};

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<MenuItem['course']>('Entrée');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setCourse('Entrée');
    setPrice('');
  };

  const addItem = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a dish name.');
      return;
    }
    const parsedPrice = Number(price);
    if (price.trim() === '' || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert('Validation', 'Please enter a valid non-negative price.');
      return;
    }
    const newItem: MenuItem = {
      id: String(Date.now()),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsedPrice,
    };
    setItems((s) => [newItem, ...s]);
    resetForm();
  };

  const removeItem = (id: string) => {
    setItems((s) => s.filter((i) => i.id !== id));
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
        <Text style={styles.itemMeta}>
          {item.course} • ${item.price.toFixed(2)}
        </Text>
      </View>

      <Pressable
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert('Delete', `Remove "${item.name}"?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Remove', style: 'destructive', onPress: () => removeItem(item.id) },
          ])
        }>
        <Text style={styles.deleteText}>Remove</Text>
      </Pressable>
    </View>
  );

  const cycleCourse = () => {
    setCourse((c) => (c === 'Entrée' ? 'Mains' : c === 'Mains' ? 'Desserts' : 'Entrée'));
  };

  return (
    <ImageBackground
      source={require('./assets/background.jpg')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Chef’s Menu Manager 👨‍🍳</Text>
              <Text style={styles.subtitle}>Welcome! Manage your restaurant menu easily.</Text>
            </View>

            {/* Input Form Section */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Dish Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Grilled Salmon"
                placeholderTextColor="#6b7280"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Short description (optional)"
                placeholderTextColor="#6b7280"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={2}
              />

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Course</Text>
                  <Pressable style={styles.courseButton} onPress={cycleCourse}>
                    <Text style={styles.courseText}>{course} (tap to change)</Text>
                  </Pressable>
                </View>

                <View style={{ width: 12 }} />

                <View style={{ width: 120 }}>
                  <Text style={styles.label}>Price</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    placeholderTextColor="#6b7280"
                    value={price}
                    onChangeText={(t) => setPrice(t.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            {/* Add Button */}
            <Pressable style={styles.addButton} onPress={addItem}>
              <Text style={styles.addButtonText}>Add Menu Item</Text>
            </Pressable>

            {/* Display Section */}
            <View style={styles.displaySection}>
              <Text style={styles.totalText}>Total Menu Items: {items.length}</Text>
            </View>
// ...existing code...
            {/* Menu List Section */}
            <View style={styles.menuList}>
              {items.length === 0 ? (
                <Text style={styles.menuListText}>No menu items yet. Add some!</Text>
              ) : (
                <FlatList
                  data={items}
                  keyExtractor={(i) => i.id}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                  keyboardShouldPersistTaps="always"
                  nestedScrollEnabled={true}
                  removeClippedSubviews={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              )}
            </View>
//
            {/* Menu List Section */}
            <View style={styles.menuList}>
              {items.length === 0 ? (
                <Text style={styles.menuListText}>No menu items yet. Add some!</Text>
              ) : (
                <FlatList
                  data={items}
                  keyExtractor={(i) => i.id}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    color: '#e5e7eb',
    fontSize: 13,
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  label: {
    color: '#0f172a',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#0f172a',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  multiline: {
    minHeight: 48,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  courseButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  courseText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  displaySection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  totalText: {
    color: '#fff',
    fontWeight: '700',
  },
  menuList: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  menuListText: {
    color: '#0f172a',
    textAlign: 'center',
    paddingVertical: 24,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e6eef3',
  },
  itemLeft: { flex: 1 },
  itemName: { fontWeight: '700', color: '#0f172a', fontSize: 16 },
  itemDesc: { color: '#475569', marginTop: 4 },
  itemMeta: { color: '#64748b', marginTop: 6, fontSize: 12 },
  deleteButton: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  deleteText: { color: '#b91c1c', fontWeight: '600' },
});
